"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const msca_actions_toolkit_1 = require("msca-actions-toolkit");
const path = __importStar(require("path"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let client = new msca_actions_toolkit_1.MscaClient();
        let args = ['run'];
        let config = core.getInput('config');
        if (!client.isNullOrWhiteSpace(config)) {
            args.push('-c');
            args.push(config);
        }
        let policy = core.getInput('policy');
        if (client.isNullOrWhiteSpace(policy)) {
            const actionDirectory = path.resolve(__dirname);
            core.debug(`actionDirectory = ${actionDirectory}`);
            const policyFilePath = path.resolve(path.join(actionDirectory, '../', 'policy', 'github.gdnpolicy'));
            core.debug(`policyFilePath = ${policyFilePath}`);
            args.push('--policy-file-path');
            args.push(policyFilePath);
        }
        else {
            args.push('-p');
            args.push(policy);
        }
        yield client.run(args);
    });
}
run().catch((error) => core.setFailed(error));
