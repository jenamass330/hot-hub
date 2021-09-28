const assert = require("assert");
const fs = require("file-system");

const {MongoClient} = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const quotes = JSON.parse(fs.readFileSync('./moviequotes.json'))
const updatedQuotesArr = [];

quotes.forEach((quote) => {
    updatedQuotesArr.push({
        quote: quote.quote,
        movie: quote.movie
    });
});

fs.writeFileSync("./moviequotes.json", JSON.stringify(updatedQuotesArr));



const batchImport = async() => {
    const client = await new MongoClient(MONGO_URI, options);

    await client.connect();

    try {
        const db = client.db('HotHub')
        console.log("connected")

        const result = await db.collection("quotes").insertMany(quotes);
        assert.equal(quotes.length, result.insertedCount)

        console.log({status: 201, data: result})
    } catch(err) {
        console.log(err.stack)
    }
    client.close()
}

batchImport()