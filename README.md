# github/ossar-action

![OSSAR windows-latest](https://github.com/github/ossar-action/workflows/OSSAR%20windows-latest/badge.svg)  
![OSSAR ubuntu-latest](https://github.com/github/ossar-action/workflows/OSSAR%20ubuntu-latest/badge.svg)

Run open source security static analysis tools without the added complexity with OSSAR (Open Source Static Analysis Runner).

# Limitations

The OSSAR action is currently in beta and runs on the `windows-latest` queue, as well as Windows self hosted agents. `ubuntu-latest` support coming soon.

# Overview

This action runs the [Microsoft Security DevOps CLI](https://aka.ms/msdo-nuget) for security analysis by:

* Installing the Microsoft Security DevOps CLI
* Installing the latest policy or referencing the local `policy/github.gdnpolicy` file
* Installing the latest open source tools
* Automatic or user-provided configuration of static analysis tools
* Execution of a full suite of static analysis tools
* Normalized processing of results into the SARIF format
* Exports a single SARIF file which can be uploaded via the `github/codeql-action/upload-sarif` action

# Open Source Tools

The following table documents what tools are currently run by this action (if applicable or configured) and the language(s) or artifact(s) they can analyze.

| Name | Analysis Coverage |
| --- | --- |
| [Bandit](https://github.com/PyCQA/bandit) | python |
| [BinSkim](https://github.com/Microsoft/binskim) | binary - Windows, ELF |
| [ESlint](https://github.com/eslint/eslint) | JavaScript |

To request a tool be integrated, please file a [new a GitHub issue](https://github.com/github/ossar-action/issues/new) in this repo.

# Usage

See [action.yml](action.yml)

## Basic

Run OSSAR with the default policy and recommended tools.

```yaml
steps:
- uses: actions/checkout@v2
- name: Run OSSAR
  uses: github/ossar-action@v1
  id: ossar
- name: Upload results to Security tab
  uses: github/codeql-action/upload-sarif@v2
  with:
    sarif_file: ${{ steps.ossar.outputs.sarifFile }}
```

**Note:** The [Microsoft Security DevOps CLI](https://aka.ms/msdo-nuget) is built with net6.0. A version greater than or equal to net6.0 of dotnet must be installed on the runner in order to run this action. GitHub hosted runners already have a compatible version of dotnet installed. To ensure a compatible version of dotnet is installed on a self-hosted runner, please configure the [actions/setup-dotnet](https://github.com/actions/setup-dotnet) action.

```
- uses: actions/setup-dotnet@v1
  with:
    #     dotnet-version: '6.0.x'
```

## Upload Results to the Security tab

To upload results to the Security tab of your repo, run the `github/codeql-action/upload-sarif` action immediately after running OSSAR. OSSAR sets the action output variable `sarifFile` to the path of a single SARIF file that can be uploaded to this API.

```yaml
- name: Upload results to Security tab
  uses: github/codeql-action/upload-sarif@v1
  with:
    sarif_file: ${{ steps.ossar.outputs.sarifFile }}
```

# More Information

Please see the [wiki tab](https://github.com/github/ossar-action/wiki) for more information and the [Frequently Asked Questions (FAQ)](https://github.com/github/ossar-action/wiki/FAQ) page.

# Report Issues

Please [file a GitHub issue](https://github.com/github/ossar-action/issues/new) in this repo. To help us investigate the issue, please include a description of the problem, a link to your workflow run (if public), and/or logs from the OSSAR's action output.

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

# Contributing

Contributions are welcome! See the [Contributor's Guide](CONTRIBUTING.md).
