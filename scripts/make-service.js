import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const serviceName = process.argv[2];
 
if (!serviceName) {
  console.error('Please provide a service name (e.g., npm run make:service Product)');
  process.exit(1);
}
 
const dirPath = path.join(__dirname, '../api');
const filePath = path.join(dirPath, `${serviceName}Service.ts`);
 
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}
 
// Adjusted the import path assuming BaseService is in the same 'api' folder
const template = `import { BaseService } from "./BaseService";
 
export class ${serviceName}Service extends BaseService {
  // Add your ${serviceName} API methods here
}
`;
 
fs.writeFileSync(filePath, template);
console.log(`✅ ${serviceName}Service successfully created at api/${serviceName}Service.ts`);