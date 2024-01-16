# BOOKSTORE

# API 설계

<details>
    <summary style="font-size: 1.5em;"> 회원 API 설계 </summary>
    <div markdown="1">

### 1. 회원 가입

-   Method
    -   POST
-   URI
    -   /join
-   HTTP status code
    -   성공 201
-   Request Body
    ```javascript
    {
        email: "사용자가 입력한 이메일",
        password: "사용자가 입력한 비밀번호"
    }
    ```
-   Response Body

### 2. 로그인

-   Method
    -   POST
-   URI
    -   /login
-   HTTP status code
    -   성공 200
-   Request Body
    ```javascript
    {
        email: "사용자가 입력한 이메일",
        password: "사용자가 입력한 비밀번호"
    }
    ```
-   Response Body
    -   JWT Token

### 3. 비밀번호 초기화 요청

-   비밀번호를 잊어버렸을 때
-   즉, 로그인 전에 사용하는 기능

-   Method
    -   POST
-   URI
    -   /reset
-   HTTP status code
    -   성공 200
-   Request Header
    ```javascript
    {
        "authorization": "eyJhbGciOiJI~.3MiOiJvbmVpayJ9~.HPCqTMK"
    }
    ```
-   Request Body
    ```javascript
    {
        email: '사용자가 입력한 이메일',
        password: '사용자가 입력한 비밀번호'
    }
    ```
-   Response Body
    ```javascript
    {
        email: '사용자가 입력한 이메일',
    }
    ```

### 4. 비밀번호 초기화 (수정)

-   Method
    -   PUT
-   URI
    -   /reset
-   HTTP status code
    -   성공 200
-   Request Body
    ```javascript
    {
        email: '비밀번호 초기화 요청 페이지에서 입력했던 이메일',
        password: '사용자가 입력한 비밀번호'
    }
    ```
-   Response Body

        </div>

</details>
<details>
    <summary style="font-size: 1.5em;"> 도서 API 설계 </summary>
    <div markdown="2">

### 1. 전체 도서 조회

-   추가 고려 사항
    -   이미지 경로
    -   n개씩 보내주기
-   Method
    -   GET
-   URI
    -   /books?limit={page당 도서 수}&currentPage={현재 page}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    ```javascript
    /*
    전체 도서 목록에는 도서의 상세 정보를 포함합니다
    필요한 데이터만 선별하여 구현 부탁드립니다
    */
    {

        books: [
            {
                book_id: 도서 id,
                title: "도서 제목",
                img: 이미지 id(picsum image #id)
                author: "도서 작가",
                summary: "도서 요약 설명",
                price: 가격,
                likes: 좋아요 수,
                published_date: "출간일"
            },
            {
                book_id: 도서 id,
                title: "도서 제목",
                img: 이미지 id(picsum image #id)
                author: "도서 작가",
                summary: "도서 요약 설명",
                price: 가격,
                likes: 좋아요 수,
                published_date: "출간일"
            }
            ...
        ],
        pagination: {
            currentPage: 현재 페이지
            totalBooks: 총 도서 수
        }

    }

    ```

### 2. 개별 도서 조회

-   추가 고려 사항
    -   이미지 경로
-   Method
    -   GET
-   URI
    -   /books/{bookId}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    ```javascript
    {
        book_id: 도서 id,
        title: "도서 제목",
        img: 이미지 id(picsum image #id)
        category_name: "도서 카테고리 이름",
        form: "도서 포맷",
        author: "도서 작가",
        isbn: "isbn",
        pages: "쪽 수",
        summary: "도서 요약 설명",
        detail: "도서 상세 설명",
        contents: "목차",
        price: 가격,
        likes: 좋아요 수,
        published_date: "출간일"
    }

    ```

### 3. 카테고리별 도서 목록 조회

-   고려 사항
    -   news: true => 신간 조회(기준: 출간일 30일 이내)(완료)
-   Method
    -   GET
-   URI
    -   /books?categoryId={categoryId}&news={boolean}
-   HTTP status code
    -   성공 200
-   Request Body
-   Response Body

    ```javascript
    [
        {
            book_id: 도서 id,
            category_id: 도서 카테고리 id,
            title: "도서 제목",
            img: 이미지 id(picsum image #id)
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            published_date: "출간일"
        },
        {
            book_id: 도서 id,
            category_id: 도서 카테고리 id,
            title: "도서 제목",
            img: 이미지 id(picsum image #id)
            category: "도서 카테고리",
            author: "도서 작가",
            summary: "도서 요약 설명",
            price: 가격,
            likes: 좋아요 수,
            published_date: "출간일"
        }
        ...
    ]

    ```

    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 카테고리 API 설계 </summary>
    <div markdown="3">

### 1. 카테고리 전체 조회

-   Method
    -   GET
-   URI
    -   /category
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    ```javascript
    [
        {
            id: 0,
            category_name: "동화"
        },
        {
            id: 1,
            category_name: "소설"
        }
        ...
    ]
    ```

    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 좋아요 API 설계 </summary>
    <div markdown="4">

### 1. 좋아요 추가

-   Method
    -   POST
-   URI
    -   /likes/{book_id}
-   HTTP status code

    -   성공 200

-   Request Headers
    ```javascript
    {
        "authorization": "eyJhbGciOiJI~.3MiOiJvbmVpayJ9~.HPCqTMK"
    }
    ```
-   Request Body

-   Response Body

### 2. 좋아요 취소

-   Method
    -   DELETE
-   URI
    -   /likes/{book_id}
-   HTTP status code
    -   성공 200
-   Request Headers
    ```javascript
    {
        "authorization": "eyJhbGciOiJI~.3MiOiJvbmVpayJ9~.HPCqTMK"
    }
    ```
-   Request Body

-   Response Body
    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 장바구니(아이템) API 설계 </summary>
    <div markdown="5">

### 1. 장바구니 담기

-   JWT 필요

-   Method
    -   POST
-   URI
    -   /cart
-   HTTP status code
    -   성공 201
-   Request Headers
    ```javascript
    {
        "authorization": "eyJhbGciOiJI~.3MiOiJvbmVpayJ9~.HPCqTMK"
    }
    ```
-   Request Body

    ```javascript
    {
        book_id: 도서 id,
        quantity: 수량
    }
    ```

-   Response Body

### 2. 장바구니 아이템 목록 조회 / 선택한 장바구니 상품 목록 조회

-   Method
    -   GET
-   URI
    -   /cart
-   HTTP status code
    -   성공 200
-   Request Headers
    ```javascript
    {
        "authorization": "eyJhbGciOiJI~.3MiOiJvbmVpayJ9~.HPCqTMK"
    }
    ```
-   Request Body

    ```javascript
    {
        selected: [cartItem_id, cartItem_id ...]
    }

    ```

-   Response Body

    ```javascript
    [
        {
            id: 장바구니 도서 id,
            book_id: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            quantity: 수량,
            price: 가격
        },
        {
            id: 장바구니 도서 id,
            book_id: 도서 id,
            title: "도서 제목",
            summary: "도서 요약",
            quantity: 수량,
            price: 가격
        },
        ...
    ]
    ```

### 3. 장바구니 삭제

-   Method
    -   DELETE
-   URI
    -   /cart/{cart_id}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    </div>

</details>

<details>
    <summary style="font-size: 1.5em;"> 주문 API 설계 </summary>
    <div markdown="6">

### 1. 주문하기

-   고려 사항

    -   주문하기 = 주문 등록(INSERT)
    -   장바구니 테이블에서 주문된 상품(DELETE)

-   Method
    -   POST
-   URI
    -   /orders
-   HTTP status code
    -   성공 201
-   Request Body

    ```javascript
    {

        cartItems: [장바구니 도서 id, 장바구니 도서 id...] // 3. orderedBook INSERT
        delivery: { // 1. delivery INSERT
            adress: "주소",
            receiver: "받는 사람",
            contact: "010-0000-0000",
        }
        userId: 회원 id, // 2. orders INSERT
        firstBookTitle: "대표 책 제목",
        totalPrice: "총 금액",
        totalQuantity: "총 수량"
    }
    ```

-   Response Body

### 2. 주문 목록(내역) 조회

-   Method
    -   GET
-   URI
    -   /orders
-   HTTP status code
    -   성공 200
-   Request Body

    ```javascript
    {
        "userId": 사용자 id
    }
    ```

-   Response Body
    ```javascript
    [
        {
            orderId: 주문 id,
            created_at: "주문 일자",
            adress: "배송지 주소",
            receiver: "받는 사람 이름",
            contact: "010-0000-0000",
            bookTitle: "대표 책 제목",
            totalPrice: "총 결제 금액",
            totalQuantity: "총 수량"
        },
        {
            orderId: 주문 id,
            created_at: "주문 일자",
            adress: "배송지 주소",
            receiver: "받는 사람 이름",
            contact: "010-0000-0000",
            bookTitle: "대표 책 제목",
            totalPrice: "총 결제 금액",
            totalQuantity: "총 수량"
        }
        ...
    ]
    ```

### 3. 주문 상세 상품 조회

-   Method
    -   GET
-   URI
    -   /orders/{order_id}
-   HTTP status code
    -   성공 200
-   Request Body

-   Response Body

    ```javascript
    [
        {
            bookId: "도서 id",
            title: "책 제목",
            author: "작가명",
            price: 가격,
            quantity: 수량,
        },
        {
            bookId: "도서 id",
            title: "책 제목",
            author: "작가명",
            price: 가격,
            quantity: 수량,
        }
        ...
    ]
    ```

    </div>

</details>

<br>

## ERD (초안)

<details>
<summary> 펼쳐보기 </summary>
<div markdown="1">

![book_store_erd](https://github.com/namu56/book-store-project/assets/107787137/8c4fe903-971e-436c-8191-05c8025ef68c)

</div>
</details>
