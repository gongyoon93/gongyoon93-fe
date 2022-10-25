# 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

1. infinite-scroll.tsx의 ProductList component에 products props 값을 pagination과 동일하게
   넘겨주려고 했으나 다른 방법이 필요했고 initialData의 영향을 받는다는 걸 알았으나 fetching data를
   주입하기 위해선 initialData의 구조를 좀 더 이해가 필요하다고 느꼈습니다.

2. Pagination / Infinite-scroll 모두 동적인 HTML 문서를 빠르게 받아올 수 있는 SSR 방식을 적용해야
   겠다 판단하였고 custom hook이 getServersideProps 내부에서 사용할 수 없어 직접 axios fetching을 작성
   하였으나 ERR_BAD_REQUEST 응답이 나타나 원인을 찾고 있습니다.
