//Picture of the day for my birthday April 30, 2021

let apod = {
    "Title": "Picture of the day for April 30, 2021, my birthday.",
    "Copyright": "Alice Ross",
    "Date": "2021-04-30",
    "Explanation": "On April 25 a nearly full moon rose just before sunset. Welcomed in a clear blue sky and framed by cherry blossoms, its familiar face was captured in this snapshot from Leith, Edinburgh, Scotland. Known to some as a Pink Moon, April's full lunar phase occurred with the moon near perigee. That's the closest point in its not-quite-circular orbit around planet Earth, making this Pink Moon one of the closest and brightest full moons of the year. If you missed it, don't worry. Your next chance to see a full perigee moon will be on May 26. Known to some as a Flower Moon, May's full moon will actually be closer to you than April's by about 98 miles (158 kilometers), or about 0.04% the distance from the Earth to the Moon at perigee.",
    "hdurl": "https://apod.nasa.gov/apod/image/2104/pink_moon.jpg",
    "media_type": "image",
    "service_version": "v1",
    "Picture Title": "Pink and the Perigee Moon",
    "url": "https://apod.nasa.gov/apod/image/2104/pink_moon.jpg"
}
for (key in apod) {
    let info = document.createElement("h2");
    info.innerHTML = `${key}: ${apod[key]}`;
    document.body.appendChild(info);
}