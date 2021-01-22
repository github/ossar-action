import * as core from '@actions/core';
import { MscaAction } from './msca-toolkit/msca-toolkit';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

let action = new MscaAction();

let analysisArgs = ""

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

var buildCommandLines:string = "";
var first = true;
projects.split(";").forEach(function (project) {
    if (!first)
    {
        buildCommandLines += " ; ";
        first = false;
    }
    buildCommandLines +=`msbuild.exe ${analysisArgs}${project}`;
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
const gdnConfigFilePath = path.resolve(path.join(actionDirectory, 'roslynanalyzers.gdnconfig'));
try
{
    fs.writeFileSync(gdnConfigFilePath, data);
}
catch(err)
{
    throw Error(err);
}

let args: string[] = [];
args.push('-c');
args.push(gdnConfigFilePath);

// Use the local policy file
const policyFilePath = path.resolve(path.join(actionDirectory, '../', 'policy', 'github.gdnpolicy'));
core.debug(`policyFilePath = ${policyFilePath}`);

args.push('--policy-file-path');
args.push(policyFilePath);

action.run(args);


try
{
    fs.unlinkSync(gdnConfigFilePath);
}
catch(err)
{
    console.error(err)
}
