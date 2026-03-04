---
title: "VSCode 확장 개발기: Path Linker"
description: "Claude와의 협업을 더 쉽게 만드는 VSCode 확장 프로그램 개발 경험"
pubDate: 2026-02-04
tags: ["vscode", "extension", "typescript", "tools", "개발기"]
author: "saintkim12"
---

## 문제에서 시작: 파일 위치 설명의 불편함

Claude와 협업할 때, 코드의 특정 위치를 설명하려면 항상 파일 경로와 줄번호를 함께 작성해야 합니다.

```
> src/components/Button.tsx의 42줄 handleClick 함수를 개선해주세요
```

하지만 실제로는 더 번거롭습니다:
- 파일 탐색기에서 파일명 복사
- 현재 줄번호 수동 입력
- 범위를 선택했을 땐 시작줄과 끝줄을 모두 기억
- 절대 경로와 상대 경로를 왔다갔다

**"이걸 자동화할 수 있지 않을까?"** 라는 생각에서 출발했습니다.

---

## VSCode Path Linker 만들기

VSCode 확장은 생각보다 접근성이 높습니다. 기본만 알면 충분합니다.

### 개발 환경 설정

```bash
# VSCode 확장 생성기 설치
npm install -g yo generator-code

# 새 프로젝트 생성
yo code
```

Yeoman 생성기가 기본 구조를 자동으로 생성해줍니다. TypeScript를 선택하는 것이 권장됩니다.

### 핵심 개념 3가지

#### 1️⃣ Extension API

VSCode 확장은 Node.js 기반이며, `vscode` 패키지를 통해 에디터 기능에 접근합니다:

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('확장 활성화됨');
}

export function deactivate() {
  console.log('확장 비활성화됨');
}
```

#### 2️⃣ 상태바 (Status Bar)

VSCode 하단의 상태바를 활용해서 실시간 정보 표시:

```typescript
const statusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  100
);

statusBarItem.text = `$(file) src/file.ts:42`;
statusBarItem.command = 'extension.copyPath'; // 클릭 시 동작
statusBarItem.show();
```

#### 3️⃣ 명령어 등록

사용자가 실행할 수 있는 기능을 명령어로 정의:

```typescript
const command = vscode.commands.registerCommand(
  'extension.copyPath',
  async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const line = editor.selection.active.line + 1;
    const path = editor.document.fileName;

    // 클립보드에 복사
    await vscode.env.clipboard.writeText(`${path}:${line}`);

    // 사용자에게 알림
    vscode.window.showInformationMessage(`✓ 복사됨: ${path}:${line}`);
  }
);
```

---

## 배운 점

### 1. VSCode Extension API는 직관적

처음엔 복잡할 줄 알았는데, 공식 문서가 잘 정리되어 있고 예제도 풍부합니다.

### 2. 이벤트 기반 개발

VSCode 확장은 이벤트 기반으로 동작합니다:
- `onDidChangeTextEditorSelection`: 커서/선택 변경
- `onDidChangeActiveTextEditor`: 파일 변경
- `onDidChangeConfiguration`: 설정 변경

### 3. 리소스 관리가 중요

`Disposable` 패턴을 사용해서 메모리 누수를 방지합니다:

```typescript
const subscription = vscode.window.onDidChangeSelection(handler);
context.subscriptions.push(subscription); // 자동 정리됨
```

### 4. 단순함의 가치

처음엔 더 많은 기능을 고려했습니다 (마크다운 포맷, 통계, 등등).
하지만 **하나의 일을 잘 하는 것**이 더 중요하다는 걸 배웠습니다.

---

## 개발 시간

| 단계 | 소요 시간 |
|------|---------|
| 환경 설정 & 학습 | 1시간 |
| 기본 구현 | 2시간 |
| 기능 추가 (경로 형식, 설정) | 1시간 |
| 테스트 & 다듬기 | 1시간 |
| **총 소요 시간** | **5시간** |

놀랍게도 매우 짧습니다. VSCode 확장 개발의 진입장벽이 생각보다 낮습니다.

---

## 결론

VSCode 확장 개발은:

- 🎯 **생각보다 간단합니다**. 기본 API만 알면 충분합니다.
- 💡 **실용적입니다**. 작은 도구가 일상 작업을 크게 개선합니다.
- 📚 **배울 점이 많습니다**. 이벤트 기반 아키텍처, 메모리 관리, 사용자 경험 설계 등.

**작은 불편함을 발견했다면, 그것을 해결하는 도구를 직접 만들어보세요.**
