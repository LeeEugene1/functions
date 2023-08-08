let intervalId

/**
 * wallet-connect-utils
 * Dependencies
 * - web2app    : https://github.com/kakao/web2app
 * - QRCode     : https://github.com/davidshimjs/qrcodejs
 * - ua-parser  : https://github.com/faisalman/ua-parser-js
 * - ethers     : https://docs.ethers.io
 * - web3       : https://web3js.readthedocs.io/
 */
const connectMap = {
    handleKilp: async () => {
        try {
            const response = await fetch("https://a2a-api.klipwallet.com/v2/a2a/prepare", {
                method:'post',
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({
                    bapp: {name:'bappName'},
                    type: 'auth'
                })
            })
    
            const {request_key} = await response.json()

            let device = get_device_state();
            resetKlip()
            if(device.isMobile){
                daumtools.web2app({ // open deep link
                    urlScheme: `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`, // iphone : custom scheme
                    intentURI: `intent://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}#Intent;scheme=kakaotalk;package=com.kakao.talk;end`, // android : intent URI
                    appName: 'Kakaotalk', // application Name (ex. facebook, twitter, daum)
                    storeURL: device.isIos ? "itms-apps://itunes.apple.com/app/id362057947" : "market://details?id=com.kakao.talk", // app store URL
                });
            }else{
                makeQR(request_key)
            }
            intervalId = setInterval(()=>{
                poll(request_key)//완료시 clearInterval(intervalId)
            },2000)
        } catch (error) {
            console.error(error)
        }
    },
}

function get_device_state() {
    let parser = new UAParser();
    let isAndroid = false;
    let isIos = false;
    let isDesktop = true;
    if (parser.getOS().name === 'Android' || parser.getOS().name === 'Android-x86')
        isAndroid = true;
    else if (parser.getOS().name === 'iOS')
        isIos = true;
    if (isIos || isAndroid)
        isDesktop = false;
    let isMobile = !isDesktop;
    return { "isIos": isIos, "isAndroid": isAndroid, "isDesktop": isDesktop, "isMobile": isMobile }
}

function makeQR(key){
    let qrOptions = {
        width: 128,
        height: 128
    }
    let qrContainer = document.getElementById('qr-container')
    new QRCode(qrContainer, `https://klipwallet.com/?target=/a2a?request_key=${key}`, qrOptions);
}

function resetKlip(){
    let qrContainer = document.getElementById('qr-container')
    qrContainer.innerHTML = ''
    document.getElementById('address').innerText = ''
    clearInterval(intervalId)
}

async function poll(key){
    try {
        const response = await fetch(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${key}`, {
            method:"GET",
            headers: { "Content-Type": "application/json" },
        })

        const data = await response.json()
        if(data.status === 'completed'){
            resetKlip()
            address = data.result.klaytn_address
            document.getElementById('address').innerText = address
        }
    } catch (error) {
        console.error(error)
    }
 }

const btnKlip = document.querySelector('#handleKilp')
const btnKlipMobile = document.querySelector('#handleKilpMobile')

btnKlip.addEventListener('click', connectMap.handleKilp)