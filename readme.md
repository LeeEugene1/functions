# func
작은단위의 기능모음

## 구조
func  
├───[nodejs]  
├───[react]  
└───.env  

## [nodejs]
### count
10초 제한의 카운트 기능. 시작, 재시작 가능

### connectKlip.html
클립지갑 로그인 기능(데스크톱)
* 모바일 클립에 접근할수있는 QR코드를 생성
* request_key를 생성하는 API를 호출
* 모바일 클립과 연결상태를 체크하는 poll API를 2초마다 호출(setInterval)
* 연결시 poll API를 해제후(clearInterval) 지갑주소 호출
[참고] : https://docs.klipwallet.com/tutorial/tutorial-a2a-rest-api#case-1-auth

### changeLanguage
언어변경 기능(준비중)