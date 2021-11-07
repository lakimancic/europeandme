let prom = 0;
let timer = setInterval(() => {
    $(`#loading-screen i:eq(${prom})`).css("display","none");
    if(prom > 0){
        $(`#loading-screen i:eq(${prom-1})`).css("display","block");
    }
    else{
        $(`#loading-screen i:eq(11)`).css("display","block");
    }
    prom++;
    if(prom == 12) prom = 0;
}, 500);

$(document).ready(() => {
    let zvuk_tacan = document.getElementById("zvuk_tacan");
    let zvuk_netacan = document.getElementById("zvuk_netacan");
    let zvuk_vreme = document.getElementById("zvuk_vreme");

    if (typeof (Storage) !== "undefined") {
        let zvukSetts = JSON.parse(localStorage.zvukSetts);
        zvuk_netacan.volume = zvukSetts.zvuk;
        zvuk_vreme.volume = zvukSetts.zvuk;
        zvuk_tacan.volume = zvukSetts.zvuk;
    }
    // VEZANO ZA DRZAVE KONSTANTNO
    const drzave = [
        {
            id: "aus",
            naziv: "Austrija",
            potrebno: 5,
        },
        {
            id: "bel",
            naziv: "Belgija",
            potrebno: 10,
        },
        {
            id: "bug",
            naziv: "Bugarska",
            potrebno: 2,
        },
        {
            id: "ces",
            naziv: "Češka",
            potrebno: 3,
        },
        {
            id: "dan",
            naziv: "Danska",
            potrebno: 8,
        },
        {
            id: "est",
            naziv: "Estonija",
            potrebno: 3,
        },
        {
            id: "fin",
            naziv: "Finska",
            potrebno: 5,
        },
        {
            id: "fra",
            naziv: "Francuska",
            potrebno: 10,
        },
        {
            id: "grk",
            naziv: "Grčka",
            potrebno: 7,
        },
        {
            id: "hol",
            naziv: "Holandija",
            potrebno: 10,
        },
        {
            id: "hrv",
            naziv: "Hrvatska",
            potrebno: 1,
        },
        {
            id: "hun",
            naziv: "Mađarska",
            potrebno: 3,
        },
        {
            id: "irs",
            naziv: "Irska",
            potrebno: 8,
        },
        {
            id: "ita",
            naziv: "Italija",
            potrebno: 10,
        },
        {
            id: "kip",
            naziv: "Kipar",
            potrebno: 3,
        },
        {
            id: "let",
            naziv: "Letonija",
            potrebno: 3,
        },
        {
            id: "lit",
            naziv: "Litvanija",
            potrebno: 3,
        },
        {
            id: "lux",
            naziv: "Luksemburg",
            potrebno: 10,
        },
        {
            id: "mal",
            naziv: "Malta",
            potrebno: 3,
        },
        {
            id: "nem",
            naziv: "Nemačka",
            potrebno: 10,
        },
        {
            id: "pol",
            naziv: "Poljska",
            potrebno: 3,
        },
        {
            id: "por",
            naziv: "Portugal",
            potrebno: 7,
        },
        {
            id: "rum",
            naziv: "Rumunija",
            potrebno: 2,
        },
        {
            id: "slk",
            naziv: "Slovačka",
            potrebno: 3,
        },
        {
            id: "slo",
            naziv: "Slovenija",
            potrebno: 3,
        },
        {
            id: "spa",
            naziv: "Španija",
            potrebno: 7,
        },
        {
            id: "sve",
            naziv: "Švedska",
            potrebno: 5,
        }
    ]
    // SVE INFORMACIJE VEZANE ZA IGRACA
    let playerInfo = {
        odnosi: [
            {
                id: "aus",
                odnos: 100
            },
            {
                id: "bel",
                odnos: 100
            },
            {
                id: "bug",
                odnos: 100
            },
            {
                id: "ces",
                odnos: 100
            },
            {
                id: "dan",
                odnos: 100
            },
            {
                id: "est",
                odnos: 100
            },
            {
                id: "fin",
                odnos: 100
            },
            {
                id: "fra",
                odnos: 30
            },
            {
                id: "grk",
                odnos: 100
            },
            {
                id: "hol",
                odnos: 100
            },
            {
                id: "hrv",
                odnos: 100
            },
            {
                id: "hun",
                odnos: 100
            },
            {
                id: "irs",
                odnos: 100
            },
            {
                id: "ita",
                odnos: 100
            },
            {
                id: "kip",
                odnos: 100
            },
            {
                id: "let",
                odnos: 100
            },
            {
                id: "lit",
                odnos: 100
            },
            {
                id: "lux",
                odnos: 100
            },
            {
                id: "mal",
                odnos: -100
            },
            {
                id: "nem",
                odnos: -100
            },
            {
                id: "pol",
                odnos: 100
            },
            {
                id: "por",
                odnos: 100
            },
            {
                id: "rum",
                odnos: 100
            },
            {
                id: "slk",
                odnos: 100
            },
            {
                id: "slo",
                odnos: 100
            },
            {
                id: "spa",
                odnos: 100
            },
            {
                id: "sve",
                odnos: 100
            }
        ],
        bdp: 700000,
        plate: 0.5,
        porez: 0.5,
        ekonom_dop: 2000,
        fabrike: 1000, // max_fabrika = ekonom_dop
        ekonomija: 3000, // = ekonom_dop + fabrike
        doprinos: 0.3, // = ekonomija / 10000
        bdp_p: 2800, // = bdp*(porez - plate + doprinos)/100
        ekol: 30,
        sreca: 60, // po potezu (plate - porez) // min: 0 max: 100
        dp: 15,
        dp_p: 1.0,
        dp_dop: 0,
        max_dp: 10, // dp_p*10, na pocetku igrac ima vise od max
        nezaposl: 55, // 100 - ( 100*fabrike/max_fabrika )*sreca/100
        prijatelji: [],
        neprijatleji: [],
        izgradnja: 0,
        potez: 1,
        ispunjeno: false,
        datum: new Date()
    };
    const fabrike = {
        "100": {
            cena: 100000,
            potezi: 1
        },
        "300": {
            cena: 250000,
            potezi: 5
        },
        "1000": {
            cena: 750000,
            potezi: 20
        }
    }
    const zaUlazak = {
        ekonomija: 20000,
        bdp: 10000000,
        avgOdnos: 85,
        ekol: 90,
        nezaposl: 15,
        plate: 0.7
    }
    // PROMENLJIVE
    let curr_tt = undefined;
    let ingame = false;
    let message = false;
    let inquest = false;
    let slideron = false;
    let timerBrojac;
    let timer;
    // METODE
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    const randomOdnosi = () => {
        playerInfo.odnosi.forEach(item => {
            let noviodnos = Math.floor(Math.random() * 70) - 10;
            item.odnos = noviodnos;
        })
    }
    const createTooltip = (i) => {
        //$("#" + id)
        let $tooltip = $("<div></div>").addClass("tooltip");
        $tooltip.append($(`<p>${drzave[i].naziv}</p>`).addClass("ime"));
        $tooltip.append($(`<div class="br"></div>`));
        $tooltip.append($("<img>").attr("src", `images/icons/d_rel.png`));
        $tooltip.append($(`<p>Diplomatski odnos</p>`).addClass("d_text"));
        $tooltip.append($(`<p>${playerInfo.odnosi[i].odnos}</p>`).addClass("d_num"));
        $tooltip.append($(`<button class="btn">Povećaj odnos</button>`));
        $tooltip.append($(`<div class="arrow"></div>`));

        $("#tt_" + playerInfo.odnosi[i].id).html("");
        $("#tt_" + playerInfo.odnosi[i].id).append($tooltip);
    };
    playerInfo.odnosi.forEach((item, i) => {
        createTooltip(i);
    });
    const numToMoney = (num) => {
        let str = num.toString();
        let newstr = "";
        for (let i = 0; i < str.length; i++) {
            if ((str.length - i) % 3 == 0 && i != 0 && str[i - 1] != '-') {
                newstr += ".";
            }
            newstr += str[i];
        }
        return newstr + " RSD";
    }
    const dateToSrb = (date) => {
        let str = "";
        str += date.getDate() + ".";
        switch (date.getMonth()) {
            case 0: str += " januar "; break;
            case 1: str += " februar "; break;
            case 2: str += " mart "; break;
            case 3: str += " april "; break;
            case 4: str += " maj "; break;
            case 5: str += " jun "; break;
            case 6: str += " jul "; break;
            case 7: str += " avgust "; break;
            case 8: str += " septembar "; break;
            case 9: str += " oktobar "; break;
            case 10: str += " novembar "; break;
            case 11: str += " decembar "; break;
        }
        str += date.getFullYear() + ".";
        return str;
    }
    const updateMenu = () => {
        $("#bdp .info_text").text(numToMoney(playerInfo.bdp));
        $("#bdp_p .info_text").text(numToMoney(playerInfo.bdp_p));
        $("#dp .info_text").text(playerInfo.dp.toFixed(2));
        $(".turn p").text("Potez: " + playerInfo.potez);
        $("#datum .info_text").text(dateToSrb(playerInfo.datum));
        if(playerInfo.bdp_p < 0){
            $("#bdp_p .info_icon").attr("src", "images/icons/coins_minus.png")
        }
        else{
            $("#bdp_p .info_icon").attr("src", "images/icons/coins_plus.png")
        }
    }
    const updateBalls = () => {
        playerInfo.odnosi.forEach(item => {
            if (item.odnos < 0) {
                $("#tt_" + item.id + " .d_num").css("color", "#bb1818");
                $("#" + item.id).css("background-image", `url("images/countryballs/${item.id}_angry.png")`);
            }
            else if (item.odnos < 50) {
                $("#tt_" + item.id + " .d_num").css("color", "#1a9834");
                $("#" + item.id).css("background-image", `url("images/countryballs/${item.id}_neutral.png")`);
            }
            else if (item.odnos <= 100) {
                $("#tt_" + item.id + " .d_num").css("color", "#1a9834");
                $("#" + item.id).css("background-image", `url("images/countryballs/${item.id}_good.png")`);
            }
        })
    }
    const updateSrbInfo = () => {
        $("#economy").text(playerInfo.ekonomija);
        $("#bdp_info").text(numToMoney(playerInfo.bdp));
        $("#bdp_p_info").text(numToMoney(playerInfo.bdp_p));
        $("#sreca").text(playerInfo.sreca.toFixed(2));
        $("#nezaposl").text(playerInfo.nezaposl + "%");
        $("#ekos").text(playerInfo.ekol);
        $("#dpoeni").text(playerInfo.dp.toFixed(2));
        $("#dpoeni_p").text(playerInfo.dp_p.toFixed(2));
        if(playerInfo.bdp_p < 0){
            $("#bdp_p_info").parent().children("img").attr("src", "images/icons/coins_minus.png")
        }
        else{
            $("#bdp_p_info").parent().children("img").attr("src", "images/icons/coins_plus.png")
        }
        if (playerInfo.sreca < 30) {
            $(".srbija").css("background-image", "url(images/countryballs/srb_angry_d.png)");
        }
        else if (playerInfo.sreca < 70) {
            $(".srbija").css("background-image", "url(images/countryballs/srb_neutral_d.png)");
        }
        else if (playerInfo.sreca <= 100) {
            $(".srbija").css("background-image", "url(images/countryballs/srb_good_d.png)");
        }
        $("#prijat").html("<p>Prijatelji:</p>");
        $("#neprijat").html("<p>Neprijatelji:</p>");
        for (let i = 0; i < Math.min(5, playerInfo.prijatelji.length); i++) {
            $("#prijat").append($("<img>").attr("src", `images/countryballs/${playerInfo.prijatelji[i]}_good.png`))
        }
        for (let i = 0; i < Math.min(5, playerInfo.neprijatleji.length); i++) {
            $("#neprijat").append($("<img>").attr("src", `images/countryballs/${playerInfo.neprijatleji[i]}_angry.png`))
        }
        $("#slider-span").css("left", playerInfo.plate * 100 + "%");
        $("#slider-span2").css("left", playerInfo.porez * 100 + "%");
        playerInfo.odnosi.forEach(item => {
            $("#tt_" + item.id).children(".tooltip").children(".d_num").text(item.odnos);
        });
        updateBalls();
        //$("#ueu").attr("disabled", true);
        if(playerInfo.ispunjeno) $("#ueu").removeAttr("disabled");
        else $("#ueu").attr("disabled", true);
        $("#plate-val").text(playerInfo.plate);
        $("#porez-val").text(playerInfo.porez);
        ////////////////////////////////////////////
        $("#fab").text(playerInfo.fabrike);
        $("#raz").text(playerInfo.ekonom_dop);
        $("#uku").text(playerInfo.ekonomija);
        ////////////////////////////////////////////
    }
    const calculateInfo = () => {
        playerInfo.ekonomija = playerInfo.fabrike + playerInfo.ekonom_dop;
        playerInfo.doprinos = playerInfo.ekonomija / 10000;
        playerInfo.bdp_p = Math.floor(playerInfo.bdp * (playerInfo.porez - playerInfo.plate + playerInfo.doprinos) / 100 + playerInfo.ekonomija*10);
        playerInfo.nezaposl = Math.floor(100 - (100 * playerInfo.fabrike / playerInfo.ekonom_dop) * playerInfo.sreca / 100);
        playerInfo.prijatelji = [];
        playerInfo.neprijatleji = [];
        playerInfo.dp_p = Number(playerInfo.dp_p) - Number(playerInfo.dp_dop);
        playerInfo.dp_dop = 0.0;
        //console.log(parseFloat(playerInfo.dp_dop));
        playerInfo.odnosi.forEach((item, i) => {
            if (item.odnos >= 50) playerInfo.prijatelji.push(item.id);
            if (item.odnos < 0) playerInfo.neprijatleji.push(item.id);
            if (item.odnos >= 70) playerInfo.dp_dop = Number(parseFloat(playerInfo.dp_dop) + drzave[i].potrebno / 10).toFixed(2);
            //console.log(drzave[i].potrebno/10);
        });
        //console.log(playerInfo.dp_dop);
        playerInfo.dp_p = parseFloat(playerInfo.dp_p) + parseFloat(playerInfo.dp_dop);
        playerInfo.max_dp = playerInfo.dp_p*10;
        let pros = 0;
        playerInfo.odnosi.forEach(item => {
            pros += item.odnos;
        });
        pros /= playerInfo.odnosi.length;
        $("#prosod").text(pros.toFixed(2));
        playerInfo.ispunjeno = playerInfo.ekonomija >= zaUlazak.ekonomija && playerInfo.bdp >= zaUlazak.bdp && pros >= zaUlazak.avgOdnos
            && playerInfo.ekol >= zaUlazak.ekol && playerInfo.nezaposl <= zaUlazak.nezaposl && playerInfo.plate >= zaUlazak.plate;
        // console.log(pros);
    }
    const nextTurn = () => {
        playerInfo.potez++;
        playerInfo.bdp += playerInfo.bdp_p;
        if (playerInfo.dp < playerInfo.max_dp) {
            playerInfo.dp += playerInfo.dp_p;
        }
        playerInfo.datum.setDate(playerInfo.datum.getDate() + 20);
        if (playerInfo.izgradnja.val) {
            playerInfo.izgradnja.pot--;
            if (playerInfo.izgradnja.pot === 0) {
                $(".messcon").css("display", "block");
                $(".chat3 .uredu").css("display", "flex");
                $(".chat3 p").text("Izgrađeno je " + playerInfo.izgradnja.val + " fabrika!");
                message = true;
                playerInfo.fabrike += playerInfo.izgradnja.val;
                playerInfo.ekol -= playerInfo.izgradnja.val / 100;
                if (playerInfo.ekol < 0) playerInfo.ekol = 0;
                playerInfo.izgradnja = 0;
                $("#gradifab").removeAttr("disabled");
            }
        }
        playerInfo.sreca += (playerInfo.plate - playerInfo.porez);
        if (playerInfo.sreca < 0) playerInfo.sreca = 0;
        if (playerInfo.sreca > 100) playerInfo.sreca = 100;
    }
    const getRandomQuest = async () => {
        try {
            const response = await axios.post('api/pitanje/readRandom.php', { 'tezina': ingame.kat, 'oblast': drzave[ingame.drz].id });
            return response.data;
        } catch (error) {
            return {
                err: "Greska pri učitavanju pitanja iz baze!"
            }
        }
    }
    const getRandomQuest2 = async (kat, obl) => {
        try {
            const response = await axios.post('api/pitanje/readRandom.php', { 'tezina': kat, 'oblast': obl });
            return response.data;
        } catch (error) {
            return {
                err: "Greska pri učitavanju pitanja iz baze!"
            }
        }
    }
    const getOfferedAnswers = async (pit_id) => {
        try {
            const response = await axios.post('api/odgovor/readOffered.php', { 'pit_id': pit_id });
            return response.data;
        } catch (error) {
            return {
                err: "Greska pri učitavanju ponudjenih odgovora iz baze!"
            }
        }
    }
    const answering = () => {
        if (timerBrojac == 0) {
            zvuk_vreme.pause();
            zvuk_vreme.currentTime = 0;
            inquest = false;
            $(".chat2 p").text("Žao nam je, isteklo Vam je vreme!");
            $(".ok").css("display", "flex");
            $(".odgs").css("display", "none");
            $(".timer").css("display", "none");
            ingame.part = 3;
            $(".srbija").css("background-image", "url(images/countryballs/srb_sad_d.png)");
            if (ingame.obl) {
                // Nista se ne desava
            }
            else {
                $(".drzava").css("background-image", "url(images/countryballs/" + drzave[ingame.drz].id + "_sad.png)");
                if (ingame.kat == 1) {
                    playerInfo.odnosi[ingame.drz].odnos -= 2;
                }
                else if (ingame.kat == 2) {
                    playerInfo.odnosi[ingame.drz].odnos -= 5;
                }
                else if (ingame.kat == 3) {
                    playerInfo.odnosi[ingame.drz].odnos -= 10;
                }
                if (playerInfo.odnosi[ingame.drz].odnos < -100) playerInfo.odnosi[ingame.drz].odnos = -100;
            }
        }
        else {
            $(".timer").text(timerBrojac);
            timerBrojac--;
            timer = setTimeout(answering, 1000);
        }
    }
    const gettingQuest = async () => {
        if (timerBrojac == 0) {
            //$(".chat2 p").text("Ovo je pitanje...");
            //$(".odgs").css("display", "flex");
            let pitanje;
            if (ingame.obl) {
                pitanje = await getRandomQuest2(ingame.kat, ingame.obl);
            }
            else {
                pitanje = await getRandomQuest();
            }
            if (pitanje.err) {
                $(".chat2 p").text(pitanje.err);
                $(".ok").css("display", "flex");
                ingame.part = 3;
                if (ingame.obl) {
                    playerInfo.bdp += 100000 * ingame.kat;
                }
                else {
                    playerInfo.dp += drzave[ingame.drz].potrebno * ingame.kat;
                }
                return;
            }
            let odgovori = await getOfferedAnswers(pitanje.pit_id);
            if (odgovori.err) {
                $(".chat2 p").text(odgovori.err);
                $(".ok").css("display", "flex");
                ingame.part = 3;
                if (ingame.obl) {
                    playerInfo.bdp += 100000 * ingame.kat;
                }
                else {
                    playerInfo.dp += drzave[ingame.drz].potrebno * ingame.kat;
                }
                return;
            }
            updateMenu();
            updateSrbInfo();
            $(".srbija").css("background-image", "url(images/countryballs/srb_answer_d.png)");
            //console.log(odgovori);
            shuffle(odgovori);
            $(".chat2 p").text(pitanje.text);
            $(".odgs").css("display", "flex");
            $(".timer").css("display", "block");
            odgovori.forEach((item, i) => {
                $(`.odgs button:eq(${i})`).text(item.text).attr("id", "odg_" + item.odg_id);
            })
            ingame.pit_id = pitanje.pit_id;
            timerBrojac = 10;
            inquest = true;
            zvuk_vreme.play();
            answering();
        }
        else {
            $(".chat2 p").text("Pitanje za " + timerBrojac);
            timerBrojac--;
            setTimeout(gettingQuest, 1000);
        }
    }
    const getCorrectAnswer = async (pit_id) => {
        try {
            const response = await axios.post('api/odgovor/readCorrect.php', { 'pit_id': pit_id });
            return response.data;
        } catch (error) {
            return {
                err: "Greska pri učitavanju tačnog odgovora iz baze!"
            }
        }
    }
    const loadEventListeners = () => {
        $(".ball").click(function () {
            if (curr_tt) {
                curr_tt.children(".tooltip").stop().fadeOut();
                if (curr_tt.attr("id") != "tt_" + $(this).attr("id")) {
                    curr_tt = $("#tt_" + $(this).attr("id"));
                    curr_tt.children(".tooltip").css("visibility", "initial").hide().stop().fadeIn();
                }
                else curr_tt = undefined;
            }
            else if (curr_tt == undefined) {
                curr_tt = $("#tt_" + $(this).attr("id"));
                curr_tt.children(".tooltip").css("visibility", "initial").hide().stop().fadeIn();
            }
            // curr_tt.children(".tooltip").stop();
            // curr_tt.children(".tooltip").fadeIn();
        });
        $(".info").hover(function () {
            $(this).children(".info_tt").stop().fadeIn();
            $(this).children(".info_arrow").stop().fadeIn();
        }, function () {
            $(this).children(".info_tt").stop().fadeOut();
            $(this).children(".info_arrow").stop().fadeOut();
        })
        $(".container").touchmove((e) => e.preventDefault())
        $(".srbija").click(() => {
            if (!ingame && !message) {
                $(".srb_con").css("display", "flex");
                if (curr_tt) {
                    curr_tt.children(".tooltip").stop().fadeOut();
                    curr_tt = undefined;
                }
                $("#next").css("visibility", "hidden");
            }
        });
        $(".close").click(() => {
            $(".srb_con").css("display", "none");
            $("#next").css("visibility", "initial");
        });
        $("#next").click(() => {
            if (!ingame && !message) {
                $(".srb_con").css("display", "none");
                $(".messcon").css("display", "none");
                nextTurn();
                calculateInfo();
                updateMenu();
                updateSrbInfo();
                if (curr_tt) {
                    curr_tt.children(".tooltip").stop().fadeOut();
                    curr_tt = undefined;
                }
            }
        });
        $(".tooltip .btn").click(function () {
            let id = $(this).parent().parent().attr("id").substring(3);
            let country;
            drzave.forEach((item, i) => {
                if (item.id == id) country = i;
            });
            ingame = {
                drz: country,
                kat: -1,
                part: 0
            }
            $(".srb_con").css("display", "none");
            if (curr_tt) {
                curr_tt.children(".tooltip").stop().fadeOut();
                curr_tt = undefined;
            }
            $(".chat_bg").css("display", "flex");
            $(".drzava").css("display", "block");
            $(".chat2 p").text("Odaberite kategoriju iz koje želite da dobijete pitanje!");
            $(".chat1 .kats").css("display", "flex");
            $(".drzava").css("background-image", "url(images/countryballs/" + id + "_explain.png)");
            $(".srbija").css("background-image", "url(images/countryballs/srb_answer_d.png)");
        });
        $(".povecajBtn").click(function () {
            let id = $(this).attr("id");
            ingame = {
                obl: id,
                kat: -1,
                part: 0
            }
            $(".srb_con").css("display", "none");
            if (curr_tt) {
                curr_tt.children(".tooltip").stop().fadeOut();
                curr_tt = undefined;
            }
            $(".chat_bg").css("display", "flex");
            $("#next").css("visibility", "initial");
            $(".drzava").css("display", "block");
            $(".chat2 p").text("Odaberite kategoriju iz koje želite da dobijete pitanje!");
            $(".chat1 .kats").css("display", "flex");
            $(".drzava").css("background-image", "url(images/countryballs/eur_explain.png)");
            $(".srbija").css("background-image", "url(images/countryballs/srb_answer_d.png)");
        });
        $(".kats button").click(function () {
            if (ingame && ingame.part == 0) {
                let kat = $(this).attr("id");
                switch (kat) {
                    case "tesk": kat = 3; break;
                    case "sred": kat = 2; break;
                    case "laka": kat = 1; break;
                }
                ingame.kat = kat;
                $(".chat1 .kats").css("display", "none");
                $(".chat1 .yesno").css("display", "flex");
                if (ingame.obl) {
                    $(".chat2 p").text(`To će Vas koštati ${numToMoney(100000 * ingame.kat)}, želite li da nastavite ?`);
                }
                else {
                    $(".chat2 p").text(`To će Vas koštati ${drzave[ingame.drz].potrebno * kat} diplomatskih poena, želite li da nastavite ?`);
                }
                ingame.part = 1;
            }
        });
        $(".yesno button").click(function () {
            if (ingame && ingame.part == 1) {
                $(".chat1 .yesno").css("display", "none");
                let is = $(this).attr("id");
                if (is == "yes") {
                    if (ingame.obl) {
                        if (100000 * ingame.kat > playerInfo.bdp) {
                            $(".chat2 p").text("Žao nam je, nemate dovoljno novca!");
                            ingame.part = 3;
                            $(".ok").css("display", "flex");
                            $(".drzava").css("background-image", "url(images/countryballs/eur_sad.png)");
                            $(".srbija").css("background-image", "url(images/countryballs/srb_sad_d.png)");
                            return;
                        }
                    }
                    else {
                        if (drzave[ingame.drz].potrebno * ingame.kat > playerInfo.dp) {
                            $(".chat2 p").text("Žao nam je, nemate dovoljno diplomatskih poena!");
                            ingame.part = 3;
                            $(".ok").css("display", "flex");
                            $(".drzava").css("background-image", "url(images/countryballs/" + drzave[ingame.drz].id + "_sad.png)");
                            $(".srbija").css("background-image", "url(images/countryballs/srb_sad_d.png)");
                            return;
                        }
                    }
                    ingame.part = 2;
                    timerBrojac = 3;
                    if (ingame.obl) {
                        playerInfo.bdp -= 100000 * ingame.kat;
                    }
                    else {
                        playerInfo.dp -= drzave[ingame.drz].potrebno * ingame.kat;
                    }
                    gettingQuest();
                }
                else if (is == "no") {
                    $(".chat_bg").css("display", "none");
                    $(".drzava").css("display", "none");
                    ingame = undefined;
                    updateSrbInfo();
                }
            }
        });
        $(".ok button").click(function () {
            if (ingame && ingame.part == 3) {
                $(".ok").css("display", "none");
                $(".drzava").css("display", "none");
                $(".chat_bg").css("display", "none");
                calculateInfo();
                updateSrbInfo();
                updateMenu();
                ingame = undefined;
            }
        });
        $(".odgs button").click(async function () {
            if (ingame && ingame.part == 2 && inquest) {
                zvuk_vreme.pause();
                zvuk_vreme.currentTime = 0;
                clearTimeout(timer);
                let tacan = await getCorrectAnswer(ingame.pit_id);
                if (tacan.err || !tacan.odg_id || !tacan.text) {
                    $(".chat2 p").text(pitanje.err);
                    $(".ok").css("display", "flex");
                    ingame.part = 3;
                    if (ingame.obl) {
                        playerInfo.bdp += 100000 * ingame.kat;
                    }
                    else {
                        playerInfo.dp += drzave[ingame.drz].potrebno * ingame.kat;
                    }
                    updateMenu();
                    updateSrbInfo();
                    return;
                }
                if(ingame.obl){
                    if ($(this).attr("id") != "odg_" + tacan.odg_id){
                        zvuk_netacan.play();
                        $(".chat2 p").text("Žao nam je, niste odgovorili tačno! Tačan odgovor je " + tacan.text);
                        $(".drzava").css("background-image", "url(images/countryballs/eur_sad.png)");
                        $(".srbija").css("background-image", "url(images/countryballs/srb_sad_d.png)");
                    }
                    else {
                        zvuk_tacan.play();
                        $(".chat2 p").text("Čestitamo, odgovorili ste tačno!");
                        $(".drzava").css("background-image", "url(images/countryballs/eur_happy.png)");
                        $(".srbija").css("background-image", "url(images/countryballs/srb_happy_d.png)");
                        if (ingame.kat == 1) {
                            if(ingame.obl == "eko"){
                                playerInfo.ekonom_dop += 200;
                            }
                            else{
                                playerInfo.ekol += 2;
                            }
                        }
                        else if (ingame.kat == 2) {
                            if(ingame.obl == "eko"){
                                playerInfo.ekonom_dop += 500;
                            }
                            else{
                                playerInfo.ekol += 5;
                            }
                        }
                        else if (ingame.kat == 3) {
                            if(ingame.obl == "eko"){
                                playerInfo.ekonom_dop += 1000;
                            }
                            else{
                                playerInfo.ekol += 10;
                            }
                        }
                        if(ingame.obl != "eko"){
                            if (playerInfo.ekol > 100) playerInfo.ekol = 100;
                        }
                    }
                }
                else{
                    if ($(this).attr("id") != "odg_" + tacan.odg_id) {
                        zvuk_netacan.play();
                        $(".chat2 p").text("Žao nam je, niste odgovorili tačno! Tačan odgovor je " + tacan.text);
                        $(".drzava").css("background-image", "url(images/countryballs/" + drzave[ingame.drz].id + "_sad.png)");
                        $(".srbija").css("background-image", "url(images/countryballs/srb_sad_d.png)");
                        if (ingame.kat == 1) {
                            playerInfo.odnosi[ingame.drz].odnos -= 2;
                        }
                        else if (ingame.kat == 2) {
                            playerInfo.odnosi[ingame.drz].odnos -= 5;
                        }
                        else if (ingame.kat == 3) {
                            playerInfo.odnosi[ingame.drz].odnos -= 10;
                        }
                        if (playerInfo.odnosi[ingame.drz].odnos < -100) playerInfo.odnosi[ingame.drz].odnos = -100;
                    }
                    else {
                        zvuk_tacan.play();
                        $(".chat2 p").text("Čestitamo, odgovorili ste tačno!");
                        $(".drzava").css("background-image", "url(images/countryballs/" + drzave[ingame.drz].id + "_happy.png)");
                        $(".srbija").css("background-image", "url(images/countryballs/srb_happy_d.png)");
                        if (ingame.kat == 1) {
                            playerInfo.odnosi[ingame.drz].odnos += 2;
                        }
                        else if (ingame.kat == 2) {
                            playerInfo.odnosi[ingame.drz].odnos += 5;
                        }
                        else if (ingame.kat == 3) {
                            playerInfo.odnosi[ingame.drz].odnos += 10;
                        }
                        if (playerInfo.odnosi[ingame.drz].odnos > 100) playerInfo.odnosi[ingame.drz].odnos = 100;
                    }
                }
                inquest = false;

                $(".ok").css("display", "flex");
                $(".odgs").css("display", "none");
                $(".timer").css("display", "none");
                ingame.part = 3;
            }
        });
        $("#save").click(() => {
            if (!message) {
                if (typeof (Storage) !== "undefined") {
                    localStorage.playerInfo = JSON.stringify(playerInfo);
                    // $(".chat1").children().css("display", "none");
                    // $(".chat1").children(".poruka").css("display", "flex");
                    // $(".chat1").css("display", "flex");
                    $(".messcon").css("display", "block");
                    $(".chat3 .uredu").css("display", "flex");
                    $(".chat3 p").text("Igra je sačuvana!");
                    message = true;
                }
                else {
                    $(".messcon").css("display", "block");
                    $(".chat3 p").text("Vaš pregledač ne podržava čuvanje podataka!");
                    $(".chat3 .uredu").css("display", "flex");
                    message = true;
                }
                $(".srb_con").css("display", "none");
                $("#next").css("visibility", "initial");
                if (curr_tt) {
                    curr_tt.children(".tooltip").stop().fadeOut();
                    curr_tt = undefined;
                }
            }
        });
        $("#gradifab").click(() => {
            if (playerInfo.izgradnja == 0) {
                $(".srb_con").css("display", "none");
                message = true;
                $(".messcon").css("display", "block");
                $("#next").css("visibility", "initial");
                //$(".chat3").children().css("display", "none");
                $(".chat3 p").css("display", "initial");
                $(".chat3 p").text("Koliko fabrika želite da izgradite?");
                $(".chat3 .uredu").css("display", "none");
                $(".chat3 .fabs").css("display", "flex");
                playerInfo.izgradnja = 1;
            }
        });
        $(".fabs button").click(function () {
            if (playerInfo.izgradnja == 1) {
                playerInfo.izgradnja = $(this).text();
                $(".chat3 .fabs").css("display", "none");
                $(".chat3 p").text(`To će Vas koštati ${numToMoney(fabrike[playerInfo.izgradnja].cena)}, i trajaće ${fabrike[playerInfo.izgradnja].potezi} poteza.`);
                $(".chat3 .dane").css("display", "flex");
            }
        });
        $(".chat3 #ne").click(() => {
            if (Number(playerInfo.izgradnja) > 1) {
                playerInfo.izgradnja = 0;
                $(".chat3 .dane").css("display", "none");
                $(".messcon").css("display", "none");
                message = false;
            }
        });
        $(".chat3 #da").click(() => {
            if (Number(playerInfo.izgradnja) > 1) {
                let t = playerInfo.izgradnja;
                if (playerInfo.bdp >= fabrike[playerInfo.izgradnja].cena) {
                    if (Number(playerInfo.izgradnja) + playerInfo.fabrike > playerInfo.ekonom_dop) {
                        $(".chat3 .dane").css("display", "none");
                        $(".chat3 .uredu").css("display", "flex");
                        $(".chat3 p").text("Izgrađen je maksimalni broj fabrika za trenutnu ekonomiju!");
                        playerInfo.izgradnja = 0;
                        return;
                    }
                    playerInfo.bdp -= fabrike[playerInfo.izgradnja].cena;
                    playerInfo.izgradnja = {
                        val: Number(t),
                        pot: fabrike[t].potezi
                    }
                    $(".chat3 .dane").css("display", "none");
                    $(".messcon").css("display", "none");
                    $("#gradifab").attr("disabled", "disabled");
                    calculateInfo();
                    updateMenu();
                    updateSrbInfo();
                }
                else {
                    $(".chat3 .dane").css("display", "none");
                    $(".chat3 .uredu").css("display", "flex");
                    $(".chat3 p").text("Nemate dovoljno novca da izgradite fabrike!");
                    playerInfo.izgradnja = 0;
                }
                message = false;
            }
        });
        $(".chat3 .uredu").click(() => {
            $(".messcon").css("display", "none");
            message = false;
        });
        $(".upitnik").click(function () {

            if ($(this).children(".popup").css("display") != "none") {
                $(this).children(".popup").css("display", "none");
                $(this).children(".popArr").css("display", "none");
            }
            else {
                $(".popArr").css("display", "none");
                $(".popup").css("display", "none");
                if ($(this).children(".popup").hasClass("ekonom")) {
                    $(this).children(".ekonom").css("display", "block");
                }
                else {
                    $(this).children(".popup").css("display", "flex");
                }
                $(this).children(".popArr").css("display", "block");
            }
        });
        $("#settings").click(() => {
            if (!message) {
                $(".settings_con").css("display", "flex");
                message = true;
                $(".srb_con").css("display", "none");
                $("#next").css("visibility", "initial");
                if (curr_tt) {
                    curr_tt.children(".tooltip").stop().fadeOut();
                    curr_tt = undefined;
                }
            }
        });
        $(".close2").click(() => {
            $(".settings_con").css("display", "none");
            message = false;
        });
        $("#ueu").click(() => {
            if(playerInfo.ispunjeno) {
                if (typeof(Storage) !== "undefined") {
                    let usao = {
                        datum: dateToSrb(playerInfo.datum),
                        potezi: playerInfo.potez
                    }
                    sessionStorage.setItem("usao", JSON.stringify(usao));
                }
                toUrl("theend.html");
            }
        });
        $(".ui-slider").mousedown(function (){
            $(this).children(".slider-value").css("display", "block");
            slideron = true;
        });
        $(".ui-slider").touchstart(function (){
            $(this).children(".slider-value").css("display", "block");
            slideron = true;
        });
        $(document).mousemove(() => {
            if(slideron){
                playerInfo.plate = (Number(sliderSpan.style.left.slice(0, -1)) / 100).toFixed(2);
                playerInfo.porez = (Number(sliderSpan2.style.left.slice(0, -1)) / 100).toFixed(2);
                calculateInfo();
                updateMenu();
                updateSrbInfo();
            }
        });
        $(document).touchmove(() => {
            if(slideron){
                playerInfo.plate = (Number(sliderSpan.style.left.slice(0, -1)) / 100).toFixed(2);
                playerInfo.porez = (Number(sliderSpan2.style.left.slice(0, -1)) / 100).toFixed(2);
                calculateInfo();
                updateMenu();
                updateSrbInfo();
            }
        });
        $(document).mouseup(function () {
            // console.log((Number(sliderSpan.style.left.slice(0,-1))/100).toFixed(2))
            // console.log((Number(sliderSpan2.style.left.slice(0,-1))/100).toFixed(2))
            if (!ingame) {
                playerInfo.plate = (Number(sliderSpan.style.left.slice(0, -1)) / 100).toFixed(2);
                playerInfo.porez = (Number(sliderSpan2.style.left.slice(0, -1)) / 100).toFixed(2);
                calculateInfo();
                updateMenu();
                updateSrbInfo();
                slideron = false;
                $(".slider-value").css("display", "none");
            }
        });
        $(document).touchend(function () {
            if (!ingame) {
                playerInfo.plate = (Number(sliderSpan.style.left.slice(0, -1)) / 100).toFixed(2);
                playerInfo.porez = (Number(sliderSpan2.style.left.slice(0, -1)) / 100).toFixed(2);
                calculateInfo();
                updateMenu();
                updateSrbInfo();
                slideron = false;
                $(".slider-value").css("display", "none");
            }
        })
    }
    randomOdnosi();
    let urlCode = window.location.search;
    if (urlCode.split("?")[1]) {
        let id = urlCode.split("?")[1].split("=")[1];
        if (id == "true") {
            if (typeof (Storage) !== "undefined") {
                if (localStorage.playerInfo) {
                    playerInfo = JSON.parse(localStorage.playerInfo);
                    //console.log(playerInfo.datum);
                    playerInfo.datum = new Date(playerInfo.datum);
                    //console.log(playerInfo.datum)
                    //console.log(localStorage.playerInfo);
                }
            }
            else {
                $(".messcon").css("display", "block");
                $(".chat3 p").text("Vaš pregledač ne podržava učitavanje podataka!");
                $(".chat3 .uredu").css("display", "flex");
                message = true;
            }
        }
    }
    if (playerInfo.izgradnja.val) {
        $("#gradifab").attr("disabled", "disabled");
    }
    loadEventListeners();
    calculateInfo();
    updateMenu();
    updateSrbInfo();
    updateBalls();
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    // console.log(playerInfo.odnosi.length);
    // console.log(JSON.stringify(playerInfo).length);
});

let timer2;

$(window).on('load',function() {
    timer2 = setInterval(loadImages, 1)
 });


 const drzCodes = ["aus","bel","bug","ces","dan","est","fin","fra","grk","hol","hrv","hun","irs","ita","kip","let","lit","lux","mal","nem","pol","por","rum","slk","slo","spa","sve","eur"];
 let loaded = 0;
 let ind = 0;

 const loadImages = () => {
    if(loaded == drzCodes.length*6 - 1){
        clearInterval(timer);
        clearInterval(timer2);
        $("#loading-screen").css("display","none");
    }
    else if(ind < 28){
        let img1 = new Image();
        img1.onload = () => { loaded++; };
        img1.src = "images/countryballs/" + drzCodes[ind] + "_happy.png";
        let img2 = new Image();
        img2.onload = () => { loaded++; };
        img2.src = "images/countryballs/" + drzCodes[ind] + "_angry.png";
        let img3 = new Image();
        img3.onload = () => { loaded++; };
        img3.src = "images/countryballs/" + drzCodes[ind] + "_sad.png";
        let img4 = new Image();
        img4.onload = () => { loaded++; };
        img4.src = "images/countryballs/" + drzCodes[ind] + "_neutral.png";
        let img5 = new Image();
        img5.onload = () => { loaded++; };
        img5.src = "images/countryballs/" + drzCodes[ind] + "_explain.png";
        let img6 = new Image();
        img6.onload = () => { loaded++; };
        img6.src = "images/countryballs/" + drzCodes[ind] + "_good.png";
        ind++;
    }
 }


 
