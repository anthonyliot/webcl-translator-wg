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

- BUILD

```
// Desktop
cmake -S . -B build/debug -DCMAKE_BUILD_TYPE=Debug
cmake --build build/debug
ctest --test-dir build/debug

cmake -S . -B build/release -DCMAKE_BUILD_TYPE=Release
cmake --build build/release
ctest --test-dir build/release

// Emscripten Web Environment
// $ ./externs/emscripten/emcc --generate-config
// Update the path for ./externs/emscripten/.emscripten
// $ ./externs/emscripten/bootstrap

cmake -S . -B build/debugwasm -DCMAKE_BUILD_TYPE=Debug -DCMAKE_TOOLCHAIN_FILE=./externs/emscripten/cmake/Modules/Platform/Emscripten.cmake
cmake --build build/debugwasm

cmake -S . -B build/releasewasm -DCMAKE_BUILD_TYPE=Release -DCMAKE_TOOLCHAIN_FILE=./externs/emscripten/cmake/Modules/Platform/Emscripten.cmake
cmake --build build/releasewasm
```
