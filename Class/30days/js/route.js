// @ts-check

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

// callback: ({중괄호 값 return})
// url + method 비교 후 맞으면 callback 함수 실행

const routes = [
  {
    url: '/posts',
    method: 'GET',
    id: 'undefined',
    callback: () => ({
      statusCode: 200,
      body: {
        posts: posts.map((post) => ({
          id: post.id,
          title: post.title,
        })),
        totalCount: posts.length,
      },
    }),
  },

  //   특정 ID의 블로그 글을 가져오는 API
  {
    url: '/posts',
    method: 'GET',
    id: 'number',
    callback: async (postId) => {
      const id = postId;
      if (!id) {
        return {
          statusCode: 404,
          body: 'Not Found',
        };
      }
      const result = posts.find((post) => post.id === id);

      if (!result) {
        return {
          statusCode: 404,
          body: 'ID Not Found',
        };
      }

      return { statusCode: 200, body: result };
    },
  },
  // 새로운 글을 쓰는 API
  {
    url: '/posts',
    method: 'POST',
    id: 'undefined',
    callback: async (id, newPost) => {
      posts.push({
        id: posts[posts.length - 1].id + 1,
        title: newPost.title,
        content: newPost.content,
      });
      return {
        statusCode: 200,
        body: 'Post is uploaded',
      };
    },
  },
  //   특정 글을 수정하는 API
  {
    url: '/posts',
    method: 'PUT',
    id: 'number',
    callback: async (id, newPost) => {
      if (!id) {
        return {
          statusCode: 404,
          body: 'Not Found',
        };
      }
      const result = posts.find((post) => post.id === id);

      if (!result) {
        return {
          statusCode: 404,
          body: 'ID Not Found',
        };
      }
      const modifyPost = newPost;
      modifyPost.id = id;
      posts[id - 1] = modifyPost;

      return { statusCode: 200, body: newPost };
    },
  },
  //    삭제하는 API
  {
    url: '/posts',
    method: 'DELETE',
    id: 'number',
    callback: async (id) => {
      if (!id) {
        return {
          statusCode: 404,
          body: 'Not Found',
        };
      }
      const result = posts.find((post) => post.id === id);

      if (!result) {
        return {
          statusCode: 404,
          body: 'ID Not Found',
        };
      }
      posts.splice(id - 1, 1);
      return {
        statusCode: 200,
        body: '글이 삭제되었습니다.',
      };
    },
  },
];

module.exports = {
  routes,
};
