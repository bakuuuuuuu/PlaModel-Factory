# PlaModel-Factory

![PlaModel-Factory Logo](#) <!-- 로고 이미지를 삽입할 위치 -->

### 각종 프라모델을 구경하고 구매할 수 있는 플랫폼

---

## Project Description
PlaModel-Factory는 프라모델 애호가들을 위한 웹 플랫폼으로, 다양한 프라모델을 구경하고 구매할 수 있는 기능을 제공합니다. 사용자는 원하는 프라모델을 검색하고, 관련 정보를 확인하며, 장바구니에 담아 구매까지 진행할 수 있습니다.

## Development

| 항목  | 내용                                              |
|-------|---------------------------------------------------|
| **OS** | Windows / Linux                            |
| **IDE** | Visual Studio Code                               |
| **Language** | JavaScript (Node.js, React)                    |
| **React version** | React 18.3.1                                 |
| **Database** | MongoDB, MySQL                             |
| **Hosting** | AWS EC2 (api2, client2)                     |

## Architecture

PlaModel-Factory 프로젝트는 네 개의 주요 모듈로 구성되어 있습니다.

1. **API**: Node.js 기반 RESTful API 서버, MongoDB와 연결하여 데이터 저장 및 관리를 담당.
2. **Client**: React로 구성된 프론트엔드 애플리케이션, API와 통신하여 사용자 인터페이스를 제공.
3. **API2**: Node.js 기반의 두 번째 RESTful API 서버, MySQL과 통합되어 데이터 처리 및 관리.
4. **Client2**: React로 구축된 두 번째 프론트엔드 애플리케이션, API2와 연동되어 프라모델 데이터를 제공.

### API & API2 Dependencies

#### API Dependencies (MongoDB 기반)

```json
{
  "bcryptjs": "^2.4.3",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.4.0",
  "morgan": "^1.10.0",
  "multer": "^1.4.5-lts.1",
  "nodemon": "^3.1.0"
}

#### API Dependencies (MySQL 기반)

```json
{
  "bcryptjs": "^2.4.3",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "morgan": "^1.10.0",
  "mysql2": "^3.10.0",
  "seedrandom": "^3.0.5",
  "sequelize": "^6.37.3",
  "nodemon": "^3.1.3"
}

### Client & Client2 Dependencies

#### Client & Client2 Dependencies (React 기반)

```json
{
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4",
  "@fortawesome/fontawesome-svg-core": "^6.1.1",
  "@fortawesome/free-regular-svg-icons": "^6.1.1",
  "@fortawesome/free-solid-svg-icons": "^6.1.1",
  "@fortawesome/react-fontawesome": "^0.1.18",
  "axios": "^0.27.2",
  "date-fns": "^2.28.0",
  "react-date-range": "^1.4.0",
  "react-router-dom": "^6.3.0"
}

---

### Dependencies

#### Core Libraries

| Package  | Version                                              |
|-------|---------------------------------------------------|
| **express** | 4.19.2                            |
| **mongoose** | 8.4.0                               |
| **mysql2** | 3.10.0                    |
| **sequelize** | 6.37.3                                 |
