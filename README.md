# Ticketing-Warrior-TEST
Ticketing Warrior 부하 테스트용 서버입니다.

### 01. k6 설치
로컬 환경에서 아래 명령어로 설치합니다.
- **macOS (Homebrew)** 
  ```bash
  brew install k6
  ```
- **Windows (Chocolately)**
   ```bash
  choco install k6
  ```
- **Linux (Ubuntu)**
   ```bash
  sudo apt update
  sudo apt install ca-certificates curl gnupg
  curl -fsSL https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6.gpg
  echo "deb [signed-by=/usr/share/keyrings/k6.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
  sudo apt update
  sudo apt install k6
  ```
- **설치 확인**
   ```bash
  k6 version
  ```

### 02. 프로젝트 환경 설정
- **패키지 설치**
  ```bash
  npm install
  ```
- **환경 변수 설정**
  - 레포지토리 루트에 `config.env.js`파일을 생성하세요. 
   > `config.env.js` 는 보안 파일이며 Github에 올리지 않도록 주의해주세요.
   <br>파일 내용은 노션의 [업무 보드] 참고할 것!
 
### 03. 테스트 실행 방법
- 프로젝트 폴더에서 아래 명령어로 실행합니다. 
  ```bash
  k6 run test/load.test.js
  ```

### 04. 테스트 결과 확인
- 테스트 종료 후 아래 dnlcldp HTML 리포트가 생성됩니다.
  ```bash
  reports/ticketing_report.html
  ```
  >  해당 파일은 github에는 올리지 않을 것 !
  
