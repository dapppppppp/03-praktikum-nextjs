
export default async function handler(req, res) {
    const API_KEY = "5415248fa92cd14b5b2d4c5fa54a86e3"; 
    const city = req.query.city || "";
  
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
  
    res.status(200).json(data);
  }
  
