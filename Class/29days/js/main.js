// @ts-check

// req(uest) = 브라우저에서 들어온 요청
// res(ponse) = 요청에 따른 서버 응답
const http = require('http');

/**
 * @typedef Post
 * @property {number} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: 1,
    title: '첫 번째 블로그 글',
    content: '첫 번째 내용입니다.',
  },
  {
    id: 2,
    title: '두 번째 블로그 글',
    content: '두 번째 내용입니다.',
  },
  {
    id: 3,
    title: '세 번째 블로그 글',
    content: '세 번째 내용입니다.',
  },
];

// const url =
const server = http.createServer((req, res) => {
  console.log('@ Request URL : ', req.url);

  // 서버가 정상일 때, 200 (규약)
  let urlArr = [];
  let id = -1;
  urlArr = req.url ? req.url.split('/') : [];
  if (urlArr.length > 2) {
    // 문자열을 숫자로 변환( 10진법 )
    id = parseInt(urlArr[2], 10);
    console.log(id);
  }

  // 서버 구축

  /**
   * 블로그용 서버 API 구성
   *
   * GET /posts           목록 가져오기
   * GET /posts/:id       글 내용 가져오기
   * POST /posts          새로운 글 올리기
   * PUT /posts/:id       기존 글 수정하기
   * DELETE /posts/:id    기존 글 삭제하기
   */

  if (req.url === '/posts' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
      })),
      totalCount: posts.length,
    };

    // 한글 사용
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    // result를 JSON 형태의 문자열로 변환
    res.end(JSON.stringify(result));
    console.log('블로그의 글 목록을 보여줄 API 입니다.');
    //   } else if (urlArr[1] === 'posts' && req.method === 'GET') {
    // res.statusCode = 200;
    // console.log(`Post ID 값은 ${id} 입니다`);
    // console.log('블로그의 특정 글 내용을 보여줄 API 입니다.');
  } else if (urlArr[1] === 'posts' && req.method === 'GET') {
    const result = posts.find((post) => post.id === id);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (result) {
      res.statusCode = 200;
      res.end(JSON.stringify(result));
      console.log('블로그의 특정 글 내용을 보여주는 API 입니다.');
      console.log(`Post ID 값은 ${id} 입니다`);
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.statusCode = 404;
      res.end('NOT FOUND');
      console.log('해당 id를 찾을 수 없습니다.');
    }
    //   } else if (req.url === '/posts' && req.method === 'POST') {
    //     res.statusCode = 200;
    //     console.log('블로그의 새로운 글을 올릴 때 호출할 API 입니다.');
  } else if (req.url === '/posts' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    req.setEncoding('utf-8');
    req.on('data', (data) => {
      console.log(data);
      // JSON.parse = obj 값으로 변환
      const newPost = JSON.parse(data);
      posts.push({
        id: posts[posts.length - 1].id + 1,
        title: newPost.title,
        content: newPost.content,
      });
      console.log(posts);
    });
    res.statusCode = 200;
    res.end('새로운 글 등록!');
    console.log('블로그의 글을 올릴 때 호출하는 API 입니다');
  } else if (id !== -1 && req.method === 'PUT') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    req.setEncoding('utf-8');
    req.on('data', (data) => {
      const modifyPost = JSON.parse(data);
      modifyPost.id = id;
      posts[id - 1] = modifyPost;
    });
    res.statusCode = 200;
    res.end(`수정된 포스트 id 번호는 ${id} 입니다.`);
    console.log(`Post ID 값은 ${id} 입니다`);
    console.log('블로그의 글을 수정할 때 호출하는 API 입니다.');
  } else if (id !== -1 && req.method === 'DELETE') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    posts.splice(id - 1, 1);
    res.end(`삭제된 포스트 id 값은 ${id} 입니다.`);
    res.statusCode = 200;
    console.log(`Post ID 값은 ${id} 입니다`);
    console.log('블로그의 글을 삭제할 때 호출하는 API 입니다.');
  } else {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 404;
    res.end('NOT FOUND');
    console.log('해당 API를 찾을 수 없습니다.');
  }
});

const PORT = 4000;

// 서버 실행
server.listen(PORT, () => {
  console.log('NODEMON WORKING PLEASE');
  console.log(`This server is running on ${PORT} port.`);
});

// HTTP 상태 코드
// 100번대 = 정보
// 200번대 = 성공
// 300번대 = 재전송
// 400번대 = 클라이언트 에러
// 500번대 = 서버 에러

// http 메소드 localhost:4000/posts
