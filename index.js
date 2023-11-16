const express = require('express');
const axios = require('axios');
const ipapi = require('ipapi.co');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'AIzaSyBlz4j8385fZLaD_zLyRnWBDjNXLAYemk0';
// Роут для получения видео по категории
app.get('/videos/:category', (req, res) => {
    ipapi.location(async (regionCode)=> {
    const { category } = req.params;
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${regionCode}&videoCategoryId=${category}&key=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }, "", '', 'country');
});

// Роут для получения шортсов
app.get('/shorts', (req, res) => {
    ipapi.location(async (regionCode)=> {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&regionCode=${regionCode}&videoCategoryId=14&maxResults=20&key=${API_KEY}`);
        // TODO
        // fix the youtube req url
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }, "", '', 'country');
});

// Роут для поиска видео
app.get('/search/:query', (req, res) => {
    ipapi.location(async (regionCode)=> {
    const { query } = req.params;
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }, "", '', 'country');
});

// Роут для получения списка категорий
app.get('/categories',(req, res) => {
    ipapi.location(async (regionCode)=> {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=${regionCode}&key=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }, "", '', 'country');
});

// Роут для получения популярных видео
app.get('/videos/popular',(req, res) => {
    ipapi.location(async (regionCode)=> {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${regionCode}&key=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }, "", '', 'country');
});

// Роут для получения информации о YouTube API
app.get('/api-info', async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}            );

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
