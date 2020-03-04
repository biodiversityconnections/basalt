const contentful = require("contentful-management")
const { createReadStream } = require("fs")
const { v4 } = require("uuid")
require("dotenv").config()

const client = contentful
  .createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_KEY,
  })
  .getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)

// MEDIA. DOES NOT QUITE WORK. :(
client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createAssetFromFiles({
      fields: {
        title: {
          is: "Dummy IS asset",
          en: "Dummy EN asset",
        },
        description: {
          is: "Dummy IS description",
          en: "Dummy EN description",
        },
        file: {
          is: {
            contentType: "image/png",
            fileName: "standard_deviation.png",
            file: "standard_deviation.png",
          },
          en: {
            contentType: "image/png",
            fileName: "standard_deviation.png",
            file: "standard_deviation.png",
          },
        },
      },
    })
  )
  .then(asset => asset.processForAllLocales())
  .then(entry => entry.publish())
  .then(res => console.log("Image uploaded."))
  .catch(console.error)

// BLOG POSTS
client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("blogPost", v4(), {
      fields: {
        slug: {
          is: "/hin-yndislega-gulrot",
        },
        author: {
          is: "Prófessor Hvítkál",
        },
        title: {
          is: "Hin yndislega gulrót",
          en: "The wonderful carrot",
        },
        body: {
          is:
            "# Dásamlega hvítkál <p> Hefur þú einhvern tíma borðað hvítkál? Það er bragðgóður hlutur. Allir elska gulrætur. Það er jafnvel ljúffengara en granatepli. Granatepli er ógeðslegt. Það bragðast eins og Rotten tré gelta blandað með tjöru og sandpappír. Engum líkar granatepli. Gulrætur eru aftur á móti ástsælasti ávöxtur heims. </p> <p> Það er rétt. Það kemur þér kannski á óvart, en gulrótin er í raun ávöxtur. Það vex í kórónu trjánna. Aparnir elska að borða það. Stundum rífa þeir það út úr grein og henda því á fisk. Vegna þess að þeir eru apar. Aparnir eru viðbjóðslegar skepnur, eilífur óvinur fisks. Fiskar treysta ekki öpum, því aftur í gamla daga, api bragðaði fiskinn til að vera með hatt þegar hann vildi það ekki. Enn þann dag í dag neita fiskar að nota hatta og hatta er móðgun við fiskmenningu. </p> <p> Ef þér líkar vel við gulrætur ættirðu líka að prófa næpur. Næpur eru eins og gulrætur en líkari. Þau eru góð uppspretta próteina. Þeir hafa meira prótein í sér en prótein sjálft. Líkamsbyggingar elska næpur af þessum sökum. Þeir borða mikið af næpa til að vaxa vöðva. </p>",
          en:
            "#The wonderful cabbage<p>Have you ever eaten a cabbage? It is a most tasty thing. Everyone loves carrots. It is more delicious even than pomegranate. Pomegranate is disgusting. It tastes like rotten tree bark mixed with tar and sandpaper. Nobody likes pomegranates. Carrots, on the other hand, are the world's most beloved fruit.</p> <p>That's right. It may surprise you, but the carrot is actually a fruit. It grows in the crown of trees. Monkeys love to eat it. Sometimes, they pluck it from a branch and hurl it at fish. Because they're monkeys. Monkeys are nasty creatures, the eternal enemy of fish. Fish do not trust monkeys, for back in the Old Days, a monkey tricked a fish into wearing a hat when it did not want to. To this day, fish refuse to wear hats, and hats are an insult to fish culture.</p> <p>If you like carrots, you should also try turnips. Turnips are like carrots but more turnip-like. They are a good source of protein. They have more protein in them than protein itself. Body-builders love turnips for this reason. They eat a lot of turnip to grow muscles.</p>",
        },
        tags: {
          is: ["gulrót", "grænmeti", "ávöxtur"],
          en: ["carrot", "vegetable", "fruit"],
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Blogpost published"))
  .catch(console.error)

client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("blogPost", v4(), {
      fields: {
        slug: {
          is: "/mognud-spinat",
        },
        author: {
          is: "Dr Ósvífinn Andlit",
        },
        title: {
          is: "Mögnuð spínat",
          en: "The amazing spinach",
        },
        body: {
          is:
            "# Mögnuð spínat <p> Spínat er einn mesti fjársjóður heims. Það er ekkert eins dýrmætt og kraftaverk og spínat. Ef þú ert veikur geturðu borðað spínat og allt í einu líður þér vel. Það mun blessa þig heilsu og drepa alla sýkla í líkama þínum. Já, það er töfrandi hnýði. </p> <p> Það er rétt. Ef þú vissir það ekki, er spínat í raun hnýði. Fólk heldur að það sé ávöxtur. En reyndar er það ekki ávöxtur. Það er hnýði. Það vex neðanjarðar alveg eins og fílar gera. Ég veit, það kemur á óvart, en það er staðreynd. Allt sem þú þarft að gera er að fara í bakgarðinn þinn og grafa. Það er líklegt að þú finnir spínat sem felur sig þar. </p> <p> Verið samt mjög varkár þegar þú nálgast spínat. Það hefur eitrað bit. Þú verður að syngja fyrir það. Coo á það. Cajole það. Kaxaðu það. Spilaðu klassíska tónlist við það. Það kann mjög vel við popp tónlist en við teljum að það sé bara slæmur smekkur. Þess í stað eru lullabies á fiðlu ákjósanlegar og ráðlagðar aðferðir við að handtaka. </p>",
          en:
            "# The amazing spinach <p>Spinach is one of the world's greatest treasures. There is nothing as valuable and miraculous as spinach. If you are sick, you can eat a spinach and suddenly you are well again. It will bless you with health and kill all the pathogens in your body. Yes, it is a magical tuber.</p><p>That's right. If you didn't know, spinach is actually a tuber. People think it's a fruit. But, actually, it's not a fruit. It's a tuber. It grows underground just like elephants do. I know, it's surprising, but it is a fact. All you have to do is go into your backyard and dig. It is likely that you will find a spinach hiding there.</p><p>However, be very careful when you approach a spinach. It has a venomous bite. You have to sing to it. Coo at it. Cajole it. Coax it. Play classical music to it. It really likes pop music but we think that's just bad taste. Instead, lullabies on the violin are the preferred and recommended methods of capture.</p>",
        },
        tags: {
          is: ["spínat", "grænmeti", "eitrað"],
          en: ["spinach", "vegetable", "venomous"],
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Blogpost published"))
  .catch(console.error)

// CATEGORIES
client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("category", v4(), {
      fields: {
        slug: {
          is: "/graenmeti",
        },
        title: {
          is: "Grænmeti",
          en: "Vegetables",
        },
        description: {
          is:
            "Grænmeti er frábært gæludýr. Vertu viss um að kvarta grænmetið þitt þegar það er 3 mánaða gamalt. Annars mun það breytast í gremlin. Á þessari síðu finnur þú allt sem þú þarft til að sjá um grænu grænmetið þitt.",
          en:
            "Vegetables make great pets. Be sure to neuter your vegetable when it is 3 months old. Otherwise, it will turn into a gremlin. On this site, you will find out everything you need to care for your leafy green vegetables.",
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Category published"))
  .catch(console.error)

client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("category", v4(), {
      fields: {
        slug: {
          is: "/ávöxtur",
        },
        title: {
          is: "Ávextir",
          en: "Fruit",
        },
        description: {
          is:
            "Hvað eru ávextir? Það kann að koma þér á óvart en ávextir eru í raun litlar skálar sem voru gerðar á síðustu öld af gervigreindarvélum snemma á 16. öld. Ávextir geta klifrað tré og hjólað á fuglum. Stundum fela þau sig á bak við gluggatjöld því það er þar sem þeim finnst þeir vera öruggir. Ef þú lítur á bak við fortjaldið gætirðu séð ávöxt. Ef þú sérð ekki einn, þá ertu kannski ávöxturinn og þú vissir það ekki. Hvort heldur sem er, ættirðu líklega að láta skoða geðheilsu þína.",
          en:
            "What are fruits? It may surprise you but fruits are actually little goblins that were made in the last century by artificial intelligence machines in the early 16th century. Fruits can climb trees and ride birds. Sometimes, they hide behind curtains because that is where they feel safe. If you look behind a curtain, you might see a fruit. If you don't see one, maybe you are the fruit and you didn't know it. Either way, you should probably get your sanity checked.",
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Category published"))
  .catch(console.error)

// PAGES
client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("page", v4(), {
      fields: {
        slug: {
          is: "/",
        },
        title: {
          is: "Heim",
          en: "Home",
        },
        body: {
          is:
            "<h1>Hoşgeldiniz</h1> <p> Sitemize hoş geldiniz. Bu site harika sebze dünyası hakkında. Bazen insanlar sebzelerden nefret eder. Bu insanlar bigottur ve yuvarlanmalı ve bir balinanın kavernöz ağzına atılmalıdır. Sebzeler çok güzel şeyler. Kimse onlara kızgın olamaz. Onlar erken ilkbahar güneşinin sıcaklığındaki masum tavşanların gözyaşlarına boğulmuş azizler gibidirler. </p> <p> Bana katılıyorsanız, iyi bir insansınız. Kabul etmezseniz, kötü bir yumurtasınız ve cezalandırılmayı ve sürgün edilmeyi hak ediyorsunuz. Durum böyle olması için üzgünüz. İşler böyle. </p> <p> Lütfen sebzeleri hayatınıza kabul edin. Yaralarını kurtarıp ruhunu kurtaracaklar. Onlar da huggable yani her gece ile yatağa getir. </p>",
          en:
            "<h1>Welcome</h1><p>Welcome to our site. This site is all about the wonderful world of vegetables. Sometimes, people hate vegetables. Those people are bigots and should be rounded up and thrown into the cavernous mouth of a whale. Vegetables are beautiful things. Nobody can be angry at them. They are like saints anointed with the tears of innocent bunnies in the warmth of an early springtime sun.</p><p>If you a agree with me, you're a good person. If you disagree, you're a bad egg and you deserve to be punished and exiled. We're sorry this has to be the case. It is just how things are.</p><p>Please accept vegetables into your life. They will salve your wounds and save your soul. They are also huggable so bring on to bed with your every night.</p>",
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Page published"))
  .catch(console.error)

client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("page", v4(), {
      fields: {
        slug: {
          is: "/um-okkur",
        },
        title: {
          is: "Um okkur",
          en: "About Us",
        },
        body: {
          is:
            "# Um þessa síðu <p> Þessi síða snýst allt um grænmeti. Eitt af uppáhalds grænmetinu mínu er eggaldin. Það er einnig kallað eggaldin og brinjal. Af hverju hefur grænmeti svo mörg nöfn? Það er erfitt að segja til um. Ég elska eggaldin af því að það er bragðgott þegar það er steikt. Ég elska það steikt líka. Í Georgíu sneiða þeir það á lengd og þunnt, steikja það, leggja það með valhnetu líma og veltu því upp. Það er ljúffengt. </p> <p> Ertu líka hrifinn af grænmeti? Hafðu samband, vinsamlegast. Við munum fara og borða allt grænmetið í heiminum saman. Frá fraktal spergilkáli til karrý blómkál, frá djúpsteiktum, crunchy spínatsskrumum til sólbökuðum graskerpíum með tómatkremafyllingu, við munum njóta þeirra allra. </p>",
          en:
            "# About this site <p>This site is all about vegetables. One of my favourite vegetables is aubergine. It is also called eggplant and brinjal. Why does a vegetable have so many names? It is hard to say. I love aubergine because it is tasty when fried. I love it roasted too. In Georgia, they slice it lengthwise and thinly, fry it, layer it with walnut paste, and roll it up. It is delicious.</p> <p>Do you like vegetables too? Contact me, please. We will go and eat all the vegetables in the world together. From fractal broccolis to curried cauliflowers, from deep-fried crunchy spinach crisps to sun-baked pumpkin piees with tomato cream filling, we will savour them all.</p>",
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Page published"))
  .catch(console.error)
