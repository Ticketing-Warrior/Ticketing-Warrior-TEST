# Ticketing-Warrior-TEST
Ticketing Warrior 부하 테스트용 서버입니다.

### 00. 사전 요구사항
1. `Node.js`
2. `npm`
3. `k6`

### 01. k6 설치
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
  - `config.env.js` 파일 생성 : 노션 [업무 보드] 참고
 
### 03. 테스트 실행 방법
- 프로젝트 폴더에서 아래 명령어 추가
  ```bash
  k6 run test/load.test.js
  ```

### 04. 테스트 결과 확인
- `reports/`폴더에 생성된 html 확인
- 해당 파일은 github에는 올리지 않을 것 !
  
