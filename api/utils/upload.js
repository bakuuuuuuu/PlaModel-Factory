import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES 모듈에서 __filename과 __dirname을 사용하는 방법
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgurl = path.join(__dirname, '../')
console.log(imgurl)



const uploadDir = path.join(imgurl, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Uploads directory created");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;