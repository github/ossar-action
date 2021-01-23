"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const msca_toolkit_1 = require("./msca-toolkit/msca-toolkit");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let action = new msca_toolkit_1.MscaAction();
let analysisArgs = "";
let analysisLevel = core.getInput('analysis-level');
if (!action.isNullOrWhiteSpace(analysisLevel)) {
    analysisArgs += `/p:AnalysisLevel=${analysisLevel} `;
}
let style = core.getInput('style');
if (!action.isNullOrWhiteSpace(style)) {
    analysisArgs += `/p:AnalysisLevelStyle=${style} `;
}
let design = core.getInput('design');
if (!action.isNullOrWhiteSpace(design)) {
    analysisArgs += `/p:AnalysisLevelDesign=${design} `;
}
let documentation = core.getInput('documentation');
if (!action.isNullOrWhiteSpace(documentation)) {
    analysisArgs += `/p:AnalysisLevelDocumentation=${documentation} `;
}
let globalization = core.getInput('globalization');
if (!action.isNullOrWhiteSpace(globalization)) {
    analysisArgs += `/p:AnalysisLevelGlobalization=${globalization} `;
}
let interoperability = core.getInput('interoperability');
if (!action.isNullOrWhiteSpace(interoperability)) {
    analysisArgs += `/p:AnalysisLevelInteroperability=${interoperability} `;
}
let maintainability = core.getInput('maintainability');
if (!action.isNullOrWhiteSpace(maintainability)) {
    analysisArgs += `/p:AnalysisLevelMaintainability=${maintainability} `;
}
let naming = core.getInput('naming');
if (!action.isNullOrWhiteSpace(naming)) {
    analysisArgs += `/p:AnalysisLevelNaming=${naming} `;
}
let performance = core.getInput('performance');
if (!action.isNullOrWhiteSpace(performance)) {
    analysisArgs += `/p:AnalysisLevelPerformance=${performance} `;
}
let reliability = core.getInput('reliability');
if (!action.isNullOrWhiteSpace(reliability)) {
    analysisArgs += `/p:AnalysisLevelReliability=${reliability} `;
}
let security = core.getInput('security');
if (!action.isNullOrWhiteSpace(security)) {
    analysisArgs += `/p:AnalysisLevelSecurity=${security} `;
}
let usage = core.getInput('usage');
if (!action.isNullOrWhiteSpace(usage)) {
    analysisArgs += `/p:AnalysisLevelUsage=${usage} `;
}
let projects = core.getInput('projects');
if (action.isNullOrWhiteSpace(projects)) {
    core.setFailed("'projects' must be non-empty");
}
var buildCommandLines = "";
var first = true;
projects.split(";").forEach(function (project) {
    if (!first) {
        buildCommandLines += " ; ";
        first = false;
    }
    buildCommandLines += `msbuild.exe ${analysisArgs}${project}`;
});
var configContent = {
    "fileVersion": "1.7.0.3",
    "tools": [
        {
            "fileVersion": "1.7.0.3",
            "tool": {
                "name": "RoslynAnalyzers",
                "version": "1.7.0.3"
            },
            "arguments": {
                "CopyLogsOnly": false,
                "SourcesDirectory": "$(Folders.SourceRepo)",
                "MSBuildVersion": "16.0",
                "CodeAnalysisAssemblyVersion": "3.8.0",
                "SetupCommandlines": "\\\"$(VisualStudioInstallDirectory)\\Common7\\Tools\\VsMSBuildCmd.bat\\\"",
                "BuildArchitecture": "amd64",
                "BuildCommandlines": buildCommandLines,
                "NetAnalyzersRootDirectory": "$(Packages.Microsoft.CodeAnalysis.NetAnalyzers)",
                "CSharpCodeStyleAnalyzersRootDirectory": "$(Packages.Microsoft.CodeAnalysis.CSharp.CodeStyle)",
                "FxCopAnalyzersRootDirectory": "",
                "RulesetPath": "",
                "SdlRulesetVersion": "",
                "LoggerLevel": "Standard"
            },
            "outputExtension": "sarif",
            "successfulExitCodes": [
                0
            ]
        }
    ]
};
const actionDirectory = path.resolve(__dirname);
core.debug(`actionDirectory = ${actionDirectory}`);
let data = JSON.stringify(configContent);
let gdnConfigFilePath = path.join(actionDirectory, '../', 'roslynanalyzers.gdnconfig');
core.debug(`gdnConfigFilePath = ${gdnConfigFilePath}`);
try {
    fs.writeFileSync(gdnConfigFilePath, data);
    data = fs.readFileSync(gdnConfigFilePath, "utf");
    core.info(data);
}
catch (err) {
    throw Error(err);
}
let args = [];
args.push('-c');
args.push(gdnConfigFilePath);
// Use the local policy file
const policyFilePath = path.resolve(path.join(actionDirectory, '../', 'policy', 'github.gdnpolicy'));
core.debug(`policyFilePath = ${policyFilePath}`);
args.push('--policy-file-path');
args.push(policyFilePath);
action.run(args);
try {
    fs.unlinkSync(gdnConfigFilePath);
}
catch (err) {
    console.error(err);
}
