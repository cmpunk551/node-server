const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const paginate = require('jw-paginate');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const users_json = fs.readFileSync('users.json')
users = JSON.parse(users_json).users;

app.get('/api/items', (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const pager = paginate(users.length, page,20);
    const pageOfItems = users.slice(pager.startIndex, pager.endIndex + 1);

    return res.json({ pager, pageOfItems });
});

const port = 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
