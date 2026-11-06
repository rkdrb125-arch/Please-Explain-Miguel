# Please Explain, Miguel

GitHub Pages에 올릴 수 있는 정적 웹 게임 프로토타입입니다.

## 실행
`index.html`을 브라우저에서 열면 됩니다.

## GitHub Pages 배포
1. GitHub에서 새 Repository를 만듭니다.
2. `index.html`, `style.css`, `script.js`를 저장소 최상단에 업로드합니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Deploy from a branch**를 선택합니다.
5. Branch는 `main`, 폴더는 `/ (root)`로 설정하고 저장합니다.

## 현재 프로토타입
- 타이틀 / 게임 / 엔딩 화면
- 20회 질문 카운터
- 선택형 질문 및 자유 질문 입력
- 추리 메모
- 정답 입력과 엔딩 분기

## 다음 개발 단계
현재는 흐름과 화면을 확인하는 프로토타입입니다. 정답은 `우산`으로 고정되어 있고, 질문별 답변은 데모용으로 작성되어 있습니다. 다음 단계에서 문제 데이터를 별도 파일로 분리하고, 각 문제의 속성에 따라 일관되게 예/아니오를 판정하도록 확장하면 됩니다.

## 캐릭터 이미지 교체
현재 캐릭터 초상화는 임시 그래픽입니다. 이미지 파일을 추가한 뒤 CSS의 `.portrait-miguel`, `.portrait-daniel`, `.miguel-avatar`, `.daniel-avatar`를 background-image 방식으로 바꾸면 됩니다.
