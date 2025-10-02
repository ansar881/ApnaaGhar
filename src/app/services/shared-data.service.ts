import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  propertiesData = [
    {
      "id": 1,
      "title": "Modern Apartment",
      "description": "A spacious, modern apartment in the heart of downtown.",
      "price": '4.5 Cr',
      "location": "Downtown, Hyderabad",
      "bedrooms": 2,
      "bathrooms": 2,
      "sq_ft": '1200sq',
      "imageUrl": "home-image4.jpg"
    },
    {
      "id": 2,
      "title": "Cozy Cottage",
      "description": "A charming cottage with a beautiful garden.",
      "price": '1.8 Cr',
      "location": "Suburbs, Kolkata",
      "bedrooms": 3,
      "bathrooms": 2,
      "sq_ft": '1400sq',
      "imageUrl": "home-image2.avif"
    },
    {
      "id": 3,
      "title": "Luxury Villa",
      "description": "A luxurious villa with a private pool and ocean view.",
      "price": '75 Lac',
      "location": "Coastal, Odisha",
      "bedrooms": 5,
      "bathrooms": 4,
      "sq_ft": '3500sq',
      "imageUrl": "home-image9.webp"
    },
    {
      "id": 4,
      "title": "Urban Loft",
      "description": "A trendy loft in a renovated industrial building.",
      "price": "32 Lac",
      "location": "City Center, Delhi",
      "bedrooms": 1,
      "bathrooms": 1,
      "sq_ft": '900sq',
      "imageUrl": "home-image10.webp"
    },
    {
      "id": 5,
      "title": "Suburban House",
      "description": "A family-friendly house with a large backyard.",
      "price": '40 Lac',
      "location": "Suburbs, Andhra Pradesh",
      "bedrooms": 4,
      "bathrooms": 3,
      "sq_ft": '2000sq',
      "imageUrl": "home-image12.jpg"
    },
    {
      "id": 6,
      "title": "Beachfront Condo",
      "description": "A condo with stunning ocean views.",
      "price": "60 Lac",
      "location": "Beachfront, Bhubaneswer",
      "bedrooms": 2,
      "bathrooms": 2,
      "sq_ft": '1100sq',
      "imageUrl": "home-image6.jpg"
    },
    {
      "id": 7,
      "title": "Mountain Cabin",
      "description": "A rustic cabin in a scenic mountain area.",
      "price": "2.2 Cr",
      "location": "Mountains, Hyderabad",
      "bedrooms": 2,
      "bathrooms": 1,
      "sq_ft": '1300sq',
      "imageUrl": "home-image7.jpg"
    },
    {
      "id": 8,
      "title": "Penthouse Suite",
      "description": "A luxurious penthouse with city skyline views.",
      "price": "8.5 Cr",
      "location": "Downtown, Mumbai",
      "bedrooms": 3,
      "bathrooms": 3,
      "sq_ft": '2100sq',
      "imageUrl": "home-image8.jpeg"
    },
    {
      "id": 9,
      "title": "Farmhouse",
      "description": "A spacious farmhouse with a large plot of land.",
      "price": "30 Lac",
      "location": "Countryside, Jajpur",
      "bedrooms": 4,
      "bathrooms": 2,
      "sq_ft": '2500sq',
      "imageUrl": "home-image3.avif"
    },
    {
      "id": 10,
      "title": "Studio Apartment",
      "description": "A cozy studio in a convenient city location.",
      "price": "1.5 Cr",
      "location": "City Center, Bhubaneswer",
      "bedrooms": 1,
      "bathrooms": 1,
      "sq_ft": '600sq',
      "imageUrl": "home-image1.webp"
    }
  ];

  multiPropertiesData = [
    {
      "id": 1,
      "title": "Modern Apartment",
      "description": "A spacious, modern apartment in the heart of downtown.",
      "price": '4.5 Cr',
      "location": "Downtown, Hyderabad",
      "bhk": "2BHK",
      "bedrooms": 2,
      "bathrooms": 2,
      "sq_ft": '1200sq',
      "imageUrl": "home-image12.jpg",
      "furnish":"Unfurnished",
      "lift": 2,
      "electricityAvl": "Yes/Rare Powercut",
      "waterAvl": "24 Hours Available",
      "carParking": "3 Covered",
      "posted":"01-01-2025"
    },
    {
      "id": 2,
      "title": "Cozy Cottage",
      "description": "A charming cottage with a beautiful garden.",
      "price": '1.8 Cr',
      "location": "Suburbs, Kolkata",
      "bhk": "3BHK",
      "bedrooms": 3,
      "bathrooms": 2,
      "sq_ft": '1400sq',
      "imageUrl": "home-image10.webp",
      "furnish":"Furnished",
      "lift": 3,
      "electricityAvl": "Yes/Rare Powercut",
      "waterAvl": "24 Hours Available",
      "carParking": "3 Covered",
      "posted":"01-01-2025"
    },
    {
      "id": 3,
      "title": "Luxury Villa",
      "description": "A luxurious villa with a private pool and ocean view.",
      "price": '75 Lac',
      "location": "Coastal, Odisha",
      "bhk": "5BHK",
      "bedrooms": 5,
      "bathrooms": 4,
      "sq_ft": '3500sq',
      "imageUrl": "home-image9.webp",
      "furnish":"Unfurnished",
      "lift": 1,
      "electricityAvl": "Yes/Rare Powercut",
      "waterAvl": "24 Hours Available",
      "carParking": "5 Covered",
      "posted":"01-01-2025"
    },
    {
      "id": 4,
      "title": "Urban Loft",
      "description": "A trendy loft in a renovated industrial building.",
      "price": "32 Lac",
      "location": "City Center, Delhi",
      "bhk": "1BHK",
      "bedrooms": 1,
      "bathrooms": 1,
      "sq_ft": '900sq',
      "imageUrl": "home-image8.jpeg",
      "furnish":"Unfurnished",
      "lift": 1,
      "electricityAvl": "Yes/Rare Powercut",
      "waterAvl": "24 Hours Available",
      "carParking": "1 Covered",
      "posted":"01-01-2025"
    },
    {
      "id": 5,
      "title": "Suburban House",
      "description": "A family-friendly house with a large backyard.",
      "price": '40 Lac',
      "location": "Suburbs, Andhra Pradesh",
      "bhk": "4BHK",
      "bedrooms": 4,
      "bathrooms": 3,
      "sq_ft": '2000sq',
      "imageUrl": "home-image7.jpg",
      "furnish":"Furnished",
      "lift": 1,
      "electricityAvl": "Yes/Rare Powercut",
      "waterAvl": "24 Hours Available",
      "carParking": "1 Covered",
      "posted":"01-01-2025"
    },
    {
      "id": 6,
      "title": "Beachfront Condo",
      "description": "A condo with stunning ocean views.",
      "price": "60 Lac",
      "location": "Beachfront, Bhubaneswer",
      "bhk": "2BHK",
      "bedrooms": 2,
      "bathrooms": 2,
      "sq_ft": '1100sq',
      "imageUrl": "home-image6.jpg",
      "furnish":"Unfurnished",
      "lift": 3,
      "electricityAvl": "Yes/Rare Powercut",
      "waterAvl": "24 Hours Available",
      "carParking": "1 Covered",
      "posted":"01-01-2025"
    },
  ];

  imageList = [
    { id:1, imageUrl: "home-image4.jpg" },
    { id:2, imageUrl: "home-image2.avif" },
    { id:3, imageUrl: "home-image9.webp" },
    { id:4, imageUrl: "home-image10.webp" },
    { id:5, imageUrl: "home-image12.jpg" },
    { id:6, imageUrl: "home-image6.jpg" },
    { id:7, imageUrl: "home-image7.jpg" },
    { id:8, imageUrl: "home-image1.webp" },
    { id:9, imageUrl: "home-image3.avif" },
  ]

  cityNames = [
    { city: "Delhi",  },
    { city: "Mumbai",  },
    { city: "Gurgaon",  },
    { city: "Bangalore",  },
    { city: "Pune",  },
    { city: "Noida",  },
    { city: "Lucknow",  },
    { city: "Ghaziabad",  },
    { city: "Navi Mumbai",  },
    { city: "Greater Noida",  },
    { city: "Chennai",  },
    { city: "Thane",  },
    { city: "Ahmedabad",  },
    { city: "Jaipur",  },
    { city: "Hyderabad",  }
  ];
}