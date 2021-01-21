# github/dotnet-analyzers-action

![.NET Analyzers windows-latest](https://github.com/github/dotnet-analyzers-action/workflows/.NET%20Analyzers%20windows-latest/badge.svg)  
![.NET Analyzers ubuntu-latest](https://github.com/github/dotnet-analyzers-action/workflows/.NET%20Analyzers%20ubuntu-latest/badge.svg)

Run [.NET code quality and code style analyzers](https://docs.microsoft.com/dotnet/fundamentals/code-analysis/overview) that ship with the .NET SDK.

# Limitations

The .NET Analyzers action is currently in beta and runs on the `windows-latest` queue, as well as Windows self hosted agents. `ubuntu-latest` support coming soon.

# Overview

This action runs the [Code Analysis CLI](https://aka.ms/mscadocs) for .NET code quality and code style analysis by:

* Installing the Code Analysis CLI
* Execution of [.NET code quality and code style analyzers](https://docs.microsoft.com/dotnet/fundamentals/code-analysis/overview) that ship with the .NET SDK
* Normalized processing of results into the SARIF format
* Exports a single SARIF file which can be uploaded via the `github/codeql-action/upload-sarif` action

# Usage

See [action.yml](action.yml)

## Basic

Run [.NET code quality and code style analyzers](https://docs.microsoft.com/dotnet/fundamentals/code-analysis/overview) that ship with the .NET SDK.

```yaml
steps:
- uses: actions/checkout@v2
- name: Run .NET code quality and code style analyzers
  uses: github/dotnet-analyzers-action@v1
  id: dotnet-analyzers
```

**Note:** The [Microsoft Code Analysis CLI](https://aka.ms/mscadocs) is built with dotnet v3.1.201. A version greater than or equal to v3.1.201 of dotnet must be installed on the runner in order to run this action. GitHub hosted runners already have a compatible version of dotnet installed. To ensure a compatible version of dotnet is installed on a self-hosted runner, please configure the [actions/setup-dotnet](https://github.com/actions/setup-dotnet) action.

```
- uses: actions/setup-dotnet@v1
  with:
    dotnet-version: '3.1.x'
```

# More Information

Please see the [wiki tab](https://github.com/github/dotnet-analyzers-action/wiki) for more information and the [Frequently Asked Questions (FAQ)](https://github.com/github/dotnet-analyzers-action/wiki/FAQ) page.

# Report Issues

Please [file a GitHub issue](https://github.com/github/dotnet-analyzers-action/issues/new) in this repo. To help us investigate the issue, please include a description of the problem, a link to your workflow run (if public), and/or logs from the .NET Analyzers's action output.

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

# Contributing

Contributions are welcome! See the [Contributor's Guide](CONTRIBUTING.md).
