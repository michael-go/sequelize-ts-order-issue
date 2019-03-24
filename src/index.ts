import {Sequelize} from 'sequelize-typescript';
import {User} from './models/User';
import {Org} from './models/Org';

async function initDB() {
  const db = new Sequelize('postgres://localhost:5432/ts-sequelize-test');

  await db.authenticate();

  db.addModels([User, Org]);

  return db;
}

async function initData(db: Sequelize) {
  await db.sync({force: true});

  const org1 = new Org({name: 'org1'});
  await org1.save();
  const org2 = new Org({name: 'org2'});
  await org2.save();

  const user1 = new User({name: 'user1', orgId: 1});
  await user1.save();
  const user2 = new User({name: 'user2', orgId: 2});
  await user2.save();
}

async function main() {
  console.log('Hello');

  const db = await initDB();

  await initData(db);

  const user = await User.findOne({
    include: [
      {model: Org}
    ],
    order: [
      // The query works if this line is removed:
      [Org, 'name', 'ASC']
    ],
  });

  console.log('user:', user.toJSON());
}

(async () => {return await main()})();
