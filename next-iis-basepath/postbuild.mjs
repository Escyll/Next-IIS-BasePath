import { promises as fs, existsSync } from "fs";
import { exit } from "process";

const deployPath = 'C:/inetpub/wwwroot/NextJsApp/';

const removeParseInt = async () => {
    try {
        var data = await fs.readFile(".next/standalone/server.js", 'utf8');
        var result = data.replace("parseInt(process.env.PORT, 10) || 3000", 'process.env.PORT');
        await fs.writeFile(".next/standalone/server.js", result, 'utf8');
    }
    catch (err) {
        console.log(err);
    }
}

const deploy = async () => {
    try {
        await fs.copyFile('.next/standalone/server.js', `${deployPath}/server.js`);
        await fs.cp('public', `${deployPath}/public`, { recursive: true });
        if (!existsSync(`${deployPath}/app`)) { await fs.mkdir(`${deployPath}/app`); }
        await fs.copyFile('app/favicon.ico', `${deployPath}/app/favicon.ico`);
        await fs.rm(`${deployPath}/.next`, { recursive: true, force: true });
        await fs.cp('.next/standalone/.next', `${deployPath}/.next`, { recursive: true });
        await fs.cp('.next/static', `${deployPath}/.next/static`, { recursive: true });
        await fs.copyFile('.next/standalone/package.json', `${deployPath}/package.json`);
        await fs.copyFile('web.config', `${deployPath}/web.config`);
    }
    catch (err) {
        console.log(err);
    }
}

if (!existsSync(`${deployPath}`) || !existsSync(".next/standalone")) {
    console.log("deploy or standalone folder does not exist.");
    exit(1);
}

await removeParseInt();
await deploy();
console.log("Done deploying");