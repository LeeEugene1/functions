let intervalId

async function handleKilp(){
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
        resetKlip()
        makeQR(request_key)
    } catch (error) {
        console.error(error)
    }
}

function makeQR(key){
    let qrOptions = {
        width: 128,
        height: 128
    }
    let qrContainer = document.getElementById('qr-container')
    new QRCode(qrContainer, `https://klipwallet.com/?target=/a2a?request_key=${key}`, qrOptions);
    intervalId = setInterval(()=>{
        poll(key)
    },2000)
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

btnKlip.addEventListener('click',()=>{
    handleKilp()
})