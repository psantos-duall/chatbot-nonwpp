import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY
});


const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());


app.use(express.urlencoded({
    extended: true
}));


//console.log()


app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello World'
    })
});

app.post('/', async (req, res) => {
    try {
        //console.log(req);
        console.log(req.body[0]);
        
        const prompt = req.body.prompt;
        
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content:`${prompt}`}],
            temperature: 0.2,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        });

    }
    catch (error){
        console.log(error);

        //res.status(500).send({error});
    }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))