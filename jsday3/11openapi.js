document.getElementById('search').addEventListener('click',function(){
    const query = document.getElementById('query').value
    const page = document.getElementById('page').value
    const size = document.getElementById('size').value
    //radio버튼 선택되었는지
    let sort = document.getElementById('accuracy').checked
    if(sort == true) sort = 'accuracy'
    else sort='recency'
    //${...}는 ...이 변수,수식,함수 등 결과값을 구해서 출력
    alert(`query=${query}&page=${page}&size=${size}&sort=${sort}`)
    search(query,page,size,sort)    //새로운 검색을 위한 함수 호출

    if(query=="") alert('검색어는 필수 입력입니다.')
    else search (query,page,size,sort)
})       //함수 끝

//search('트와이스',1,10,'accuracy') //함수 정의보다 앞에서 호출하면 오류

    const search =function(v1,v2,v3,v4){
       
       //비동기 통신을 위한 객체 생성
        const xhr = new XMLHttpRequest();

        //1.HTTP 요청 초기화
        xhr.open("GET",`https://dapi.kakao.com/v2/search/vclip?query=${v1}&page=${v2}&size=${v3}&sort=${v4}`);
        //2.요청header 설정
        xhr.setRequestHeader("Authorization","KakaoAK 08d289ed55ff5302368ea26e3bc7c6e8");
        //3.HTTP 요청 전송 :추가적인 파라미터는 함께 전송
        xhr.send();
        //4.onload 이벤트: 요청이 완료되고 이에 대한 응답이 왔을 때 실행될 이벤트 핸들러 작성.
        xhr.onload=function() {
         if(xhr.status==200){   //응답코드가 200일 때만
            document.getElementById('list').innerHTML=''
            let $response = JSON.parse(xhr.response)
            let results = $response.documents
            results.forEach(element => {            //results 배열의 각 값들을 순서대로 element가 참조하며 함수 실행
                const $ul =document.createElement('ul')     //새로운 ul태그요소 생성
                //${} : 표현식 기호- 변수, 수식, 함수.. 결과값이 있으면 사용가능
                const temp = `<li>${element.author}</li>
                <li>${element.title}</li>
                <li>${element.datetime}</li>
                <li>${element.play_time}</li>
                <li><a href=${element.url} target="_blank"><img src=${element.thumbnail} width="200px"></a></li>`
                $ul.innerHTML=temp                  //ul태그요소의 innerHTML 설정
                document.getElementById('list').appendChild($ul)//ul태그 요소를 <p id="list"></p>의 자식요소를 추가
                })//foreach 끝
            };//if 끝
        }//onload 끝
    } //search 함수 끝
    search('트와이스',1,10,'accuracy')  //함수 호출