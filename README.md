### INSTALLATION

- VSCODE EXTENSION

```
ms-vscode.cpptools-extension-pack
github.vscode-github-actions
elagil.pre-commit-helper
xaver.clang-format
twxs.cmake
ms-vscode.cmake-tools
josetr.cmake-language-support-vscode
cheshirekow.cmake-format
galarius.vscode-opencl
kriegalex.vscode-cudacpp
nvidia.nsight-vscode-edition
```

- OSX SPECIFIC

```
brew install pre-commit
brew install clang-format
pip3 uninstall cmake-format
pip3 install --upgrade --force-reinstall cmakelang
```

- COMMON

```
git config hooks.clangFormatDiffInteractive false
pre-commit autoupdate
pre-commit install
pre-commit run --all-files
```
