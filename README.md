# PlaModel-Factory

![PlaModel-Factory Logo](PlaModel-Factory-Logo.jpg)

### 각종 프라모델을 구경하고 구매할 수 있는 플랫폼

---

## Project Description
PlaModel-Factory는 프라모델 애호가들을 위한 웹 플랫폼으로, 다양한 프라모델을 구경하고 구매할 수 있는 기능을 제공합니다. 사용자는 원하는 프라모델을 검색하고, 관련 정보를 확인하며, 장바구니에 담아 구매까지 진행할 수 있습니다.

## 시연 영상

프로젝트의 시연 영상을 확인해보세요:

[![시연 영상 보기](https://img.youtube.com/vi/E_KFmdy8OSw/0.jpg)](https://youtu.be/E_KFmdy8OSw)

---

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
```

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
```

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
```

---

### Dependencies

#### Core Libraries

| Package  | Version                                              |
|-------|---------------------------------------------------|
| **express** | 4.19.2                            |
| **mongoose** | 8.4.0                               |
| **mysql2** | 3.10.0                    |
| **sequelize** | 6.37.3                                 |

#### Styling

| Package  | Version                                              |
|-------|---------------------------------------------------|
| **@emotion/react** | 11.10.0                            |
| **@emotion/styled** | 11.11.0                               |
| **@mui/icons-material** | 5.16.3                    |
| **@mui/material** | 5.16.5                                 |
| **classnames** | 	2.3.1                                 |
| **sass** | 1.77.8                                 |
| **styled-components** | 6.11.2                                 |

#### HTTP Client

| Package  | Version                                              |
|-------|---------------------------------------------------|
| **axios** | 0.27.2                            |

#### Utility Libraries

| Package  | Version                                              |
|-------|---------------------------------------------------|
| **date-fns** | 3.6.0                            |
| **classnames** | 2.5.1                            |

---

### Features

**다양한 프라모델 카탈로그**: 사용자는 다양한 프라모델을 검색하고 탐색할 수 있습니다.
**다양한 결제 옵션**: 다양한 결제 방법을 지원하여 사용자에게 편리한 결제 경험을 제공합니다.
**구매 후 리뷰 기능**: 구매한 제품에 대한 리뷰를 작성하고 다른 사용자들과 공유할 수 있습니다.
**실시간 재고 관리**: 재고 상태를 실시간으로 반영하여 사용자가 구매 가능한 제품만을 확인할 수 있습니다.
