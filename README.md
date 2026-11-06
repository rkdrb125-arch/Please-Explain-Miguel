# Please Explain, Miguel

GitHub Pages용 정적 웹게임 스타터입니다.

## 실행
`index.html`을 브라우저에서 열거나 GitHub 저장소에 업로드한 뒤 Pages를 활성화하세요.

## GitHub Pages 배포
1. GitHub에서 새 Public 저장소를 만듭니다.
2. `index.html`, `style.css`, `script.js`를 저장소 최상단에 업로드합니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Deploy from a branch**를 선택하고 `main` / `/(root)`를 지정해 저장합니다.
5. 잠시 후 표시되는 주소에서 게임을 확인합니다.

## 수정할 곳
- 게임 정답 및 질문 답변: `script.js`의 `SECRET_ANSWER`, `questionRules`
- 화면 디자인: `style.css`
- 문구와 섹션 구성: `index.html`

현재 버전은 디자인과 기본 상호작용을 잡아둔 프로토타입입니다. 캐릭터 일러스트, 실제 20문항 분기, 여러 사건/엔딩은 다음 단계에서 추가하면 됩니다.
