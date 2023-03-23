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
/*
app.use(express.json());
*/


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
        //console.log(req);
        //console.log(req.body);
        //console.log("body: " + req.body);
        
        const prompt = req.body.prompt;
        
        const request = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content:`${prompt}`}],
            temperature: 0.2,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });

        console.log(request.data.id);

        console.log("response raw: " + request.data.choices[0].message.content)

        //console.log("response choices: " + response.data.choices[0].text)

        
        res.status(200).send({
            bot: request.data.choices[0].message.content
        });
        
    }
    catch (error){
        console.log(error);

        //res.status(500).send({error});
    }
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))