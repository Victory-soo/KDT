// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://victory-soo:zxc01234@cluster0.zt1kzsb.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();
  const users = client.db('home').collection('family');

  await users.deleteMany({});
  //   await users.deleteOne({
  //     name: 'soo',
  //   });

  //   greater equal = 같거나 그 이상 삭제
  //   await users.deleteMany({
  //     age: { $gte: 10 },
  //   });

  //   await users.insertOne({
  //     name: 'Mother',
  //     age: '56',
  //   });
  await users.insertMany([
    {
      name: 'chaeyul',
      age: 1,
    },
    {
      name: 'yuha',
      age: 0,
    },
    {
      name: 'soo',
      age: 26,
    },
  ]);

  //   수정(또는 없는 key값 추가가능) = {조건식}, {수정할 내용}
  await users.updateOne(
    {
      name: 'soo',
    },
    {
      $set: {
        name: 'Seungsoo',
        gender: 'male',
      },
    }
  );

  await users.updateMany(
    {
      age: { $lte: 0 },
    },
    {
      $set: {
        gender: 'male',
      },
    }
  );

  //   const data 에는 await가 붙지 않음 (DB 통신을 할 때는 전부 await 사용)
  //   Cursor 형태로 출력함(배열 형태 말고)
  const data = users.find({
    name: 'chaeyul',
  });

  console.log(data);
  //   const arr = await data.toArray();
  const arr = await users.findOne({
    name: 'yuha',
  });

  //   data의 값 모두 출력
  //   await data.forEach(console.log);
  //   console.log(data);
  console.log(arr);

  //   client 닫기
  await client.close();
}

main();
