const mysql = require('mysql2');
const pool = require('./src/db/database');

// Array of questions and choices
const data = [
    // {
    //     question: 'من هو اللاعب الذي يرتدي الرقم 7 في نادي .. بايرن ميونخ ؟',
    //     choices: [
    //         { text: 'موسيالا', isCorrect: false },
    //         { text: 'غنابري', isCorrect: true },
    //         { text: 'ليون غروسكا', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'ماهو الاسم الاول لـ لاعب مانشستر سيتي .. دوكو ؟',
    //     choices: [
    //         { text: 'سباستيان', isCorrect: false },
    //         { text: 'مورجن', isCorrect: false },
    //         { text: 'جيريمي', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'في كاس العالم الاخير مجموعة السعوديه كانت تضم الارجنتين و بولندا ومن ايضا ؟',
    //     choices: [
    //         { text: 'المكسيك', isCorrect: true },
    //         { text: 'الهندوراس', isCorrect: false },
    //         { text: 'الاروغواي', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'في دوري ابطال اوربا عام 2019 .. من الفريق الذي اخرج السيتي ؟',
    //     choices: [
    //         { text: 'ليفربول', isCorrect: false },
    //         { text: 'ريال مدريد', isCorrect: false },
    //         { text: 'توتنهام', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من هو آخر لاعب خليجي .. لعب في الدوري الانجليزي ؟',
    //     choices: [
    //         { text: 'علي الحبسي', isCorrect: true },
    //         { text: 'سامي الجابر', isCorrect: false },
    //         { text: 'مختار علي', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'عندما كان في توتنهام .. كم كان رقم اللاعب .. مورديتش ؟',
    //     choices: [
    //         { text: '13', isCorrect: false },
    //         { text: '14', isCorrect: true },
    //         { text: '15', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'في الموسم الماضي من الدوري الاسباني .. من كان هداف نادي .. اسبانيول ؟',
    //     choices: [
    //         { text: 'اسبا', isCorrect: false },
    //         { text: 'برايثوايت', isCorrect: false },
    //         { text: 'خوسيلو', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'بـ استثناء انشيلوتي وغوارديولا .. اذكرلي مدرب وصل الى نهائي دوري ابطال اوربا 4 مرات ؟',
    //     choices: [
    //         { text: 'سير اليكس', isCorrect: true },
    //         { text: 'مورينيو', isCorrect: false },
    //         { text: 'زيدان', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'في يورو 2012 .. من كان المركز الرابع في مجموعة اللمانيا ؟',
    //     choices: [
    //         { text: 'بولندا', isCorrect: false },
    //         { text: 'هولندا', isCorrect: true },
    //         { text: 'كرواتيا', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'في كاس العالم عام 2002 .. هداف البطوله كان رونالدو .. من البرازيلي الثاني ؟',
    //     choices: [
    //         { text: 'رنالدينهو', isCorrect: false },
    //         { text: 'روبرتو كارلوس', isCorrect: false },
    //         { text: 'ريفالدو', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'اذكرلي النادي الاوكراني الذي لعب له .. شيفشينكو ؟',
    //     choices: [
    //         { text: 'دينامو كييف', isCorrect: true },
    //         { text: 'شختار', isCorrect: false },
    //         { text: 'كارباتي لفيف', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'في نهائي دوري ابطال اوربا عام 2011 بين مانشستر وبرشلونه .. من اللاعب الذي سجل اول هدف ؟',
    //     choices: [
    //         { text: 'روني', isCorrect: false },
    //         { text: 'بيدرو', isCorrect: true },
    //         { text: 'ميسي', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'قبل نادي اي سي ميلان من اي نادي تم شراء اللاعب اسماعيل بن ناصر ؟',
    //     choices: [
    //         { text: 'جنوى', isCorrect: false },
    //         { text: 'لاتسيو', isCorrect: false },
    //         { text: 'امبولي', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'ماهو النادي الانجليزي الوحيد الذي لعب له .. هيغوايين ؟',
    //     choices: [
    //         { text: 'تشيلسي', isCorrect: true },
    //         { text: 'مان ستي', isCorrect: false },
    //         { text: 'توتنهام', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'من هو آخر مدرب اسباني درب نادي .. نيوكاسل ؟',
    //     choices: [
    //         { text: 'ديل بوسكي', isCorrect: false },
    //         { text: 'رافا بينيتز', isCorrect: true },
    //         { text: 'هايكتور كارنكا', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'بـ استثناء ميسي .. من هو آخر لاعب لاتيني ترشح لـ جائزة افضل لاعب بالعام ؟',
    //     choices: [
    //         { text: 'فينيسيوس', isCorrect: false },
    //         { text: 'سواريز', isCorrect: false },
    //         { text: 'نيمار', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'في نهائي كأس العالم للانديه عام 2021 .. اذكرلي احد اطراف النهائي',
    //     choices: [
    //         { text: 'تشلسي بالميراس', isCorrect: true },
    //         { text: 'ليفربول بالميراس', isCorrect: false },
    //         { text: 'ريال مدريد بالميراس', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'من هو اكثر حارس نظافه للشباك في تاريخ الدوري الانجليزي ؟',
    //     choices: [
    //         { text: 'شمايكل الأب', isCorrect: false },
    //         { text: 'بيتر تشيك', isCorrect: true },
    //         { text: 'أليسون بيكر', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'قبل انتقاله الى نادي توتنهام .. من اين تم شراء الحارس فيكاريو',
    //     choices: [
    //         { text: 'جنوى', isCorrect: false },
    //         { text: 'ميلان', isCorrect: false },
    //         { text: 'امبولي', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من هو الهداف التاريخي لـ نادي .. بايرن ميونخ ؟',
    //     choices: [
    //         { text: 'جيرد مولر', isCorrect: true },
    //         { text: 'كارل هاينز', isCorrect: false },
    //         { text: 'ليفاندوسكي', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'في الموسم الماضي من دوري ابطال اوربا .. من الفريق الذي اخرج بنفيكا ؟',
    //     choices: [
    //         { text: 'مان ستي', isCorrect: false },
    //         { text: 'أنتر ميلان', isCorrect: true },
    //         { text: 'ريال مدريد', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'في يورو 2012 من المنتخب الذي اخرج فرنسا من البطوله ؟',
    //     choices: [
    //         { text: 'إيطاليا', isCorrect: false },
    //         { text: 'المانيا', isCorrect: false },
    //         { text: 'أسبانيا', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'في اي سنه انتقل اول مره كاكا الى نادي .. اي سي ميلان ؟',
    //     choices: [
    //         { text: '٢٠٠٣', isCorrect: true },
    //         { text: '٢٠٠٤', isCorrect: false },
    //         { text: '٢٠٠٢', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'بـ استثناء بنزيما و مبابي .. من هو آخر لاعب فرنسي ترشح لـ جائزه افضل لاعب في العالم ؟',
    //     choices: [
    //         { text: 'كانتي', isCorrect: false },
    //         { text: 'قريزمان', isCorrect: true },
    //         { text: 'زيدان', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو آخر لاعب سجل هدفين في نهائي دوري ابطال اوربا؟',
    //     choices: [
    //         { text: 'امبابي', isCorrect: false },
    //         { text: 'كرستيانو رونالدو', isCorrect: false },
    //         { text: 'جارث بيل', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من اللاعب الحالي الذي يرتدي الرقم 10 في نادي .. نيوكاسل',
    //     choices: [
    //         { text: 'انثوني غوردن', isCorrect: true },
    //         { text: 'الكسندر إسحاق', isCorrect: false },
    //         { text: 'مارك جيليسبي', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'قبل دي زيربي .. من كان مدرب نادي برايتون',
    //     choices: [
    //         { text: 'كريس هويتون', isCorrect: false },
    //         { text: 'غراهام بوتر', isCorrect: true },
    //         { text: 'طوني بلوم', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'في نهائي يورو عام 2004 بين البرتغال و اليونان .. من سجل هدف المباراة ؟',
    //     choices: [
    //         { text: 'نونو فالينتي', isCorrect: false },
    //         { text: 'زيسيس فريزاس', isCorrect: false },
    //         { text: 'انجيلوس خاريستياس', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'اذكرلي لاعب حالي لعب لـ نادي روما ويوفينتوس ؟',
    //     choices: [
    //         { text: 'ديبالا', isCorrect: true },
    //         { text: 'لوكاكو', isCorrect: false },
    //         { text: 'روي باتريسيو', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'في عام 2000 فيغو فاز في جائزة افضل لاعب في العالم .. اذكرلي الثاني او الثالث ؟',
    //     choices: [
    //         { text: 'زيدان رونالدو', isCorrect: false },
    //         { text: 'زيدان شفشينكو', isCorrect: true },
    //         { text: 'شيفشنكو رونالدو', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو اكثر فريق استقبل اهداف في تاريخ نهائي دوري ابطال اوربا',
    //     choices: [
    //         { text: 'ريال مدريد', isCorrect: false },
    //         { text: 'ميلان', isCorrect: false },
    //         { text: 'اليوفي', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'في الدوري الاسباني موسم 2021 .. من كان النادي الوحيد الذي يبدأ اسمه بحرف .. الهاء',
    //     choices: [
    //         { text: 'هويسكا', isCorrect: true },
    //         { text: 'هدرسفيلد تاون', isCorrect: false },
    //         { text: 'هسيتاو ريفو', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو اول فريق سجل عليه كريستيانو رونالدو في دوري ابطال اوربا ؟',
    //     choices: [
    //         { text: 'ليون', isCorrect: false },
    //         { text: 'روما', isCorrect: true },
    //         { text: 'مارسيليا', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'في كاس العالم للانديه من هو آخر نادي حقق البطوله 3 مرات متتاليه ؟',
    //     choices: [
    //         { text: 'برشلونة', isCorrect: false },
    //         { text: 'بايرن ميونخ', isCorrect: false },
    //         { text: 'ريال مدريد', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'بـ استثناء جواو فيلكس و غريزمان .. اذكرلي لاعب لعب لـ برشلونه و اتليتيكو',
    //     choices: [
    //         { text: 'سواريز', isCorrect: true },
    //         { text: 'دي بول', isCorrect: false },
    //         { text: 'اوبلاك', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'في نهائي كاس العالم عام 2014 .. من صنع الهدف ؟',
    //     choices: [
    //         { text: 'مسعود اوزيل', isCorrect: false },
    //         { text: 'اندرية شوليه', isCorrect: true },
    //         { text: 'توني كروس', isCorrect: false },
    //     ]
    // },
    // {
    //     question: 'اذكرلي مدرب اسباني سبق وان درب نادي .. تشيلسي',
    //     choices: [
    //         { text: 'اميري', isCorrect: false },
    //         { text: 'لوبيتيغي', isCorrect: false },
    //         { text: 'رافا بينتيز', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من هو اكثر لاعب لعب نهائي دوري ابطال اوربا ؟',
    //     choices: [
    //         { text: 'مالديني', isCorrect: true },
    //         { text: 'ميسي', isCorrect: false },
    //         { text: 'راموس', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'ماهو آخر نادي اللماني وصل الى نهائي اليوربا ليغ ؟',
    //     choices: [
    //         { text: 'بوروسيا دورتمند', isCorrect: false },
    //         { text: 'آينتراخت فرانكفورت', isCorrect: true },
    //         { text: 'هوفنهام', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'في كاس اسبانيا الموسم الماضي .. اذكرلي احد مسجلين الأهداف',
    //     choices: [
    //         { text: 'فينيسوس', isCorrect: false },
    //         { text: 'فارفيردي', isCorrect: false },
    //         { text: 'رودريجو', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'كم مرة فازت السعودية في كأس العرب؟',
    //     choices: [
    //         { text: 'مرتين', isCorrect: true },
    //         { text: 'ثلاث مرات', isCorrect: false },
    //         { text: 'مره واحدة', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'متى انطلقت بطولة كأس العالم؟',
    //     choices: [
    //         { text: '١٩٢٦', isCorrect: false },
    //         { text: '١٩٣٠', isCorrect: true },
    //         { text: '١٩٣٤', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو أكثر مدرب حصل على لقب دوري أبطال أوروبا؟',
    //     choices: [
    //         { text: 'زيدان', isCorrect: false },
    //         { text: 'بيب قوارديولا', isCorrect: false },
    //         { text: 'كارلو انشيلوتي', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من هو اللاعب الوحيد الذي شارك في ١٩ موسم متتالي في الدوري السعودي؟',
    //     choices: [
    //         { text: 'محمد الشلهوب', isCorrect: true },
    //         { text: 'وليد عبدالله', isCorrect: false },
    //         { text: 'محمد نور', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'كم عدد الأندية التي شاركت في الموسم الافتتاحي للدوري الممتاز؟',
    //     choices: [
    //         { text: '٢٠', isCorrect: false },
    //         { text: '٢٢', isCorrect: true },
    //         { text: '١٨', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من اللاعب الألماني الدولي السابق الذي أصبح مصارعا محترفا في WWE',
    //     choices: [
    //         { text: 'بودولسكي', isCorrect: false },
    //         { text: 'اندرية فيلابواس', isCorrect: false },
    //         { text: 'تيم ويس', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'متى كانت النسخة الأولى من كأس أمم أوروبا؟',
    //     choices: [
    //         { text: '١٩٦٠', isCorrect: true },
    //         { text: '١٩٥٦', isCorrect: false },
    //         { text: '١٩٥٨', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو هداف منتخب إنجلترا في كأس أمم أوروبا؟',
    //     choices: [
    //         { text: 'هاري كين', isCorrect: false },
    //         { text: 'ألان شيرار', isCorrect: true },
    //         { text: 'وأين روني', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'في أي عام زادت المنتخبات المشاركة في كأس أمم أوروبا من ١٦ إلى ٢٤؟',
    //     choices: [
    //         { text: '٢٠١٢', isCorrect: false },
    //         { text: '٢٠٠٨', isCorrect: false },
    //         { text: '٢٠١٦', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من الذي فاز بكأس أمم أوروبا كلاعب ومدرب؟',
    //     choices: [
    //         { text: 'بيرتي فوجتس', isCorrect: true },
    //         { text: 'ديدي ديشامب', isCorrect: false },
    //         { text: 'ديل بوسكي', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من فاز بجائزة رجل المباراة في نهائي كأس العالم ٢٠١٤؟',
    //     choices: [
    //         { text: 'ليونيل ميسي', isCorrect: false },
    //         { text: 'ماريو جويتز', isCorrect: true },
    //         { text: 'باستيان', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في أياكس – يوفنتوس – بايرن ميونخ',
    //     choices: [
    //         { text: 'كم مين جاي', isCorrect: false },
    //         { text: 'بونا سار', isCorrect: false },
    //         { text: 'ماتياس دي لخت', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في ستون فيلا – نوتس كاونتي – أستون فيلا – مانشستر سيتي',
    //     choices: [
    //         { text: 'جاك جريلتش', isCorrect: true },
    //         { text: 'جاكوب رايت', isCorrect: false },
    //         { text: 'ميكا هاملتون', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في تشيلسي – ويغان الإنجليزي – تشيلسي',
    //     choices: [
    //         { text: 'مالو غوستو', isCorrect: false },
    //         { text: 'ريس جيمس', isCorrect: true },
    //         { text: 'نوني مادويك', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في راسينغ الأرجنتيني – فالينسيا – راسينغ الأرجنتيني – فالينسيا – أودينيزي – أتليتيكو مدريد',
    //     choices: [
    //         { text: 'مولينا', isCorrect: false },
    //         { text: 'أنخيل كوريا', isCorrect: false },
    //         { text: 'دي بول', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في كالياري – كومو – كالياري – انتر',
    //     choices: [
    //         { text: 'باريلا', isCorrect: true },
    //         { text: 'باستوني', isCorrect: false },
    //         { text: 'أسلاني', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في اوساسونا الإسباني – مارسيليا الفرنسي – تشيلسي – أتليتيكو مدريد',
    //     choices: [
    //         { text: 'خيمينيز', isCorrect: false },
    //         { text: 'أزبيليكويتا', isCorrect: true },
    //         { text: 'مولدوفان', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في ليدز – مانشستر سيتي – ويستهام',
    //     choices: [
    //         { text: 'أنطونيو', isCorrect: false },
    //         { text: 'جارود بوين', isCorrect: false },
    //         { text: 'كالفن فيليبس', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في نانس الفرنسي – إشبيلية – برشلونة – توتنهام – برشلونة – أستون فيلا',
    //     choices: [
    //         { text: 'كليمان لينغليه', isCorrect: true },
    //         { text: 'لوكاس دينيه', isCorrect: false },
    //         { text: 'ألكس مورينو', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'لاعب حالي لعب في تشيلسي – فيتسيه الهولندي – تشيلسي – ليفربول – بورنموث',
    //     choices: [
    //         { text: 'ادم سميث', isCorrect: false },
    //         { text: 'سولانكي', isCorrect: true },
    //         { text: 'تايلر ادمز', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو المنتخب الأول الذي فاز بكأس العالم خارج قارته ؟',
    //     choices: [
    //         { text: 'الأورغواي', isCorrect: false },
    //         { text: 'إيطاليا', isCorrect: false },
    //         { text: 'البرازيل', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من هو الفريق الرومانيا الذي قام بالفوز بدوري أبطال أوروبا لمرة واحدة',
    //     choices: [
    //         { text: 'ستيوا بوخارست', isCorrect: true },
    //         { text: 'إيمولا', isCorrect: false },
    //         { text: 'تشيزينا', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'ما هي الدولة التي قامت بارتداء القمصان الخاصة بها والأسماء على ظهرها لأول مرة في نهائيات كأس العالم',
    //     choices: [
    //         { text: 'البرازيل', isCorrect: false },
    //         { text: 'إنجلترا', isCorrect: true },
    //         { text: 'أمريكا', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'ما هو النادي الذي سجل فيه اللاعب واين روني هدفه الأول؟',
    //     choices: [
    //         { text: 'ليفربول', isCorrect: false },
    //         { text: 'أستون فيلا', isCorrect: false },
    //         { text: 'أرسنال', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'ما هو النادي الذي يرتبط بمصطلح جالاكتيكوس؟',
    //     choices: [
    //         { text: 'ريال مدريد', isCorrect: true },
    //         { text: 'أتليتكو مدريد', isCorrect: false },
    //         { text: 'إسبانيول', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'متى تم تغيير اسم كأس أوروبا إلى دوري أبطال أوروبا؟',
    //     choices: [
    //         { text: 'موسم ٩٣ ، ٩٤', isCorrect: false },
    //         { text: 'موسم ٩٢ ، ٩٣', isCorrect: true },
    //         { text: 'موسم ٩٥ ، ٩٦', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'ما هو أول فريق فاز بكأس أوروبا من المملكة المتحدة؟',
    //     choices: [
    //         { text: 'مانشستر يونايتد', isCorrect: false },
    //         { text: 'ليفربول', isCorrect: false },
    //         { text: 'سلتيك', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'كم مرة فازت السعودية ببطولة آسيا؟',
    //     choices: [
    //         { text: 'أربع مرات', isCorrect: false },
    //         { text: 'خمس مرات', isCorrect: false },
    //         { text: 'ثلاث مرات', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من هو هداف برشلونة عبر التاريخ؟',
    //     choices: [
    //         { text: 'ميسي', isCorrect: true },
    //         { text: 'ماردونا', isCorrect: false },
    //         { text: 'سواريز', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'أين كان يلعب تيري هنري قبل انضمامه لنادي أرسنال؟',
    //     choices: [
    //         { text: 'موناكو', isCorrect: false },
    //         { text: 'يوفنتوس', isCorrect: true },
    //         { text: 'برشلونة', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'كم عدد الدول التي تأهلت لكأس العالم 2022؟',
    //     choices: [
    //         { text: '٣٤', isCorrect: false },
    //         { text: '٣٢', isCorrect: true },
    //         { text: '٣٦', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'قام ميسي بارتداء رقمين أثناء اللعب لبرشلونة 30 و10، وهناك رقم آخر قام بارتدائه فما هو؟',
    //     choices: [
    //         { text: '١٨', isCorrect: false },
    //         { text: '١٦', isCorrect: false },
    //         { text: '١٩', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'ما هو عدد المرات التي فاز خلالها نادي بايرن ميونخ الأماني بدوري أبطال أوروبا',
    //     choices: [
    //         { text: '٦', isCorrect: true },
    //         { text: '٧', isCorrect: false },
    //         { text: '٥', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو اللاعب الأكبر سناً الذي شارك في كأس العالم؟',
    //     choices: [
    //         { text: 'محمد الشلهوب', isCorrect: false },
    //         { text: 'عصام الحضري', isCorrect: true },
    //         { text: 'حسام حسن', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'كم عدد أبطال كرة القدم في كأس العالم؟',
    //     choices: [
    //         { text: '٩', isCorrect: false },
    //         { text: '١٠', isCorrect: false },
    //         { text: '٨', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من الاعب الذي كان يلعب في برشلونة قد تعرض للسجن نتيجة أنه كان يحمل جواز سفر مزور',
    //     choices: [
    //         { text: 'رونالدينهو', isCorrect: true },
    //         { text: 'داني ألفيش', isCorrect: false },
    //         { text: 'ماسكيرانو', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'نادي تحطمت الطائرة التي كانت تستقل لاعبيه وأدت إلى موت جميع اللاعبين بالإضافة إلى ركاب آخرين في عام 1958م؟',
    //     choices: [
    //         { text: 'بايرن ميونخ', isCorrect: false },
    //         { text: 'مانشستر يونايتد', isCorrect: true },
    //         { text: 'يوفينتوس', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'متى تم تأسيس نادي مانشستر سيتي؟',
    //     choices: [
    //         { text: '١٨٩٩', isCorrect: false },
    //         { text: '١٨٨٨', isCorrect: false },
    //         { text: '١٨٨٠', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'ما هو أكثر المنتخبات فوزاً بكأس الأمم الأفريقية؟',
    //     choices: [
    //         { text: 'المنتخب المصري', isCorrect: true },
    //         { text: 'المنتخب الكامروني', isCorrect: false },
    //         { text: 'المنتخب النيجيري', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'باستثناء محمد صلاح وساديو ماني من هو اللاعب الثالث الذي شارك في الحذاء الذهبي في الدوري الإنجليزي الممتاز في ٢٠١٨-٢٠١٩ ؟',
    //     choices: [
    //         { text: 'سون', isCorrect: false },
    //         { text: 'اوباميانق', isCorrect: true },
    //         { text: 'هاري كين', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو اللاعب صاحب أسرع هاتريك في الدوري الإنجليزي الممتاز؟',
    //     choices: [
    //         { text: 'واين روني', isCorrect: false },
    //         { text: 'فان بيرسي', isCorrect: false},
    //         { text: 'ساديو ماني', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'من هو اللاعب الذي سجل أسرع هدف في تاريخ الدوري الإنجليزي في وقت ٧.٦٩ ثانية؟',
    //     choices: [
    //         { text: 'شين لونج', isCorrect: true },
    //         { text: 'هازارد', isCorrect: false },
    //         { text: 'ساديو ماني', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو مدرب توتنهام السابق الذي تنافس في رالي داكار؟',
    //     choices: [
    //         { text: 'بوتنشينوا', isCorrect: false },
    //         { text: 'أندريه فيلاس بواس', isCorrect: true },
    //         { text: 'مورينيو', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'سجل كريستيانو رونالدو هدفه الأول في دوري أبطال أوروبا بعد كم مباراة ؟',
    //     choices: [
    //         { text: '٢٦', isCorrect: false },
    //         { text: '٢٨', isCorrect: false },
    //         { text: '٢٧', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'في أي عام مما يلي تأسس نادي ليفربول',
    //     choices: [
    //         { text: '١٨٩٢', isCorrect: true },
    //         { text: '١٨٩٥', isCorrect: false },
    //         { text: '١٨٩٩', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'أي فريق فاز بلقب دوري الدرجة الأولى الإنجليزي لكرة القدم في موسم 1900-01',
    //     choices: [
    //         { text: 'مانشستر يونايتد', isCorrect: false },
    //         { text: 'ليفربول', isCorrect: true },
    //         { text: 'آرسنال', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'فازت ألمانيا بكأس العالم أربع مرات، لكن كم مرة فعلوا ذلك كدولة موحدة؟',
    //     choices: [
    //         { text: 'ثلاث مرات', isCorrect: false },
    //         { text: 'مرة واحدة', isCorrect: true },
    //         { text: 'مرتين', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'أدار يورجن كلوب فريقين في ألمانيا، بوروسيا دورتموند، والآخر هو؟',
    //     choices: [
    //         { text: 'بايرن ليفركوزن', isCorrect: false },
    //         { text: 'هيرتا برلين', isCorrect: false },
    //         { text: 'ماينز', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'فاز ثلاثة أشخاص بكأس العالم كلاعب ومدرب. ماريو زاجالو ديدييه ديشامب … هل يمكنك تسمية الثالث؟',
    //     choices: [
    //         { text: 'فرانز بيكنباور', isCorrect: true },
    //         { text: 'زيدان', isCorrect: false },
    //         { text: 'زيكو', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'في أي بطولة كأس عالم سجل فيها دييغو مارادونا هدفه الشهير “باليد”؟',
    //     choices: [
    //         { text: 'إسبانيا ٨٢', isCorrect: false },
    //         { text: 'المكسيك ٨٦', isCorrect: true },
    //         { text: 'إيطاليا ٩٠', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو المنتخب الوحيد الذي تمكن من التأهل لجميع بطولات كأس العالم؟',
    //     choices: [
    //         { text: 'الأرجنتين', isCorrect: false },
    //         { text: 'المانيا', isCorrect: false },
    //         { text: 'البرازيل', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'متى أقيمت ثاني بطولة كأس عالم لكرة القدم؟',
    //     choices: [
    //         { text: '١٩٣٤', isCorrect: true },
    //         { text: '١٩٥٢', isCorrect: false },
    //         { text: '١٩٥٦', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'في أي دولة أقيمت ثاني بطولة كأس عالم لكرة القدم؟',
    //     choices: [
    //         { text: 'الأروغواي', isCorrect: false },
    //         { text: 'إيطاليا', isCorrect: true },
    //         { text: 'البرازيل', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من أشهر لاعب في تاريخ كرة القدم؟',
    //     choices: [
    //         { text: 'بيليه', isCorrect: false },
    //         { text: 'بيكهام', isCorrect: false },
    //         { text: 'كريستيانو رونالدو', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'من هو اللاعب الوحيد الذي فاز بدوري أبطال أوروبا مع ثلاثة أندية مختلفة؟',
    //     choices: [
    //         { text: 'كلارنس سيدورف', isCorrect: true },
    //         { text: 'زلاتان إبراهيموفيتش', isCorrect: false },
    //         { text: 'داني ألفيش', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'ما هو الرقم القياسي لأهداف كأس العالم؟',
    //     choices: [
    //         { text: '١٧', isCorrect: false },
    //         { text: '١٦', isCorrect: true },
    //         { text: '١٥', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو المدرب المعروف بلقب سبيشال ون ؟',
    //     choices: [
    //         { text: 'بيب غوارديولا', isCorrect: false },
    //         { text: 'يورجن كلوب', isCorrect: false },
    //         { text: 'جوزيه مورينيو', isCorrect: true },
    //     ]
    // },
    // {
    //     question: 'ما اسم المدرب الذي قاد منتخب إيطاليا لتحقيق كأس العالم لكرة القدم عام 2006 ؟',
    //     choices: [
    //         { text: 'ليبي', isCorrect: true },
    //         { text: 'مانشيني', isCorrect: false },
    //         { text: 'أريغو ساكي', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'ما هو المنتخب العربي الذي يطلق عليه لقب العنابي ؟',
    //     choices: [
    //         { text: 'البحريني', isCorrect: false },
    //         { text: 'القطري', isCorrect: true },
    //         { text: 'العُماني', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'من هو أول لاعب عربي فاز مع فريقه ببطولة دوري أبطال أوروبا ؟',
    //     choices: [
    //         { text: 'أشرف حكيمي', isCorrect: false },
    //         { text: 'محمد صلاح', isCorrect: false },
    //         { text: 'رابح ماجر', isCorrect: true },
    //     ]
    // }
    // {
    //     question: 'What is the longest word in the English language?',
    //     choices: [
    //         { text: 'Antidisestablishmentarianism', isCorrect: true },
    //         { text: 'Hippopotomonstrosesquippedaliophobia', isCorrect: false },
    //         { text: 'Floccinaucinihilipilification', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the name of the world’s smallest horse?',
    //     choices: [
    //         { text: 'Falabella', isCorrect: true },
    //         { text: 'Shetland pony', isCorrect: false },
    //         { text: 'Miniature horse', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is Benedictine monk Dom Pierre Pérignon rumored to have created?',
    //     choices: [
    //         { text: 'Tomato ketchup', isCorrect: false },
    //         { text: 'Champagne', isCorrect: true },
    //         { text: 'French fries', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which country drinks the most amount of coffee per person?',
    //     choices: [
    //         { text: 'Finland', isCorrect: true },
    //         { text: 'Italy', isCorrect: false },
    //         { text: 'Colombia', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the collective name for a group of unicorns?',
    //     choices: [
    //         { text: 'A sparkle', isCorrect: false },
    //         { text: 'A spell', isCorrect: false },
    //         { text: 'A blessing', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What is the most common color of toilet paper in France?',
    //     choices: [
    //         { text: 'Pink', isCorrect: true },
    //         { text: 'White', isCorrect: false },
    //         { text: 'Blue', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many years old is the world’s oldest piece of chewing gum?',
    //     choices: [
    //         { text: '100', isCorrect: false },
    //         { text: '2,500', isCorrect: false },
    //         { text: '5,700', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'How many times per day does the average American open their fridge?',
    //     choices: [
    //         { text: '5', isCorrect: false },
    //         { text: '22', isCorrect: true },
    //         { text: '33', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What color is an airplane’s famous black box?',
    //     choices: [
    //         { text: 'Red', isCorrect: false },
    //         { text: 'Orange', isCorrect: true },
    //         { text: 'Black', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is Bombay Duck’s main ingredient?',
    //     choices: [
    //         { text: 'Fish', isCorrect: true },
    //         { text: 'Duck', isCorrect: false },
    //         { text: 'Chicken', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many tails does a Manx cat have?',
    //     choices: [
    //         { text: 'None', isCorrect: true },
    //         { text: 'One', isCorrect: false },
    //         { text: 'Two', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'On a boat, what is the opposite of port?',
    //     choices: [
    //         { text: 'Bow', isCorrect: false },
    //         { text: 'Starboard', isCorrect: true },
    //         { text: 'Deck', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who invented the bikini?',
    //     choices: [
    //         { text: 'Louis Vuitton', isCorrect: false },
    //         { text: 'Coco Chanel', isCorrect: false },
    //         { text: 'Louis Reard', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'As of July 2023, how many episodes of South Park are there?',
    //     choices: [
    //         { text: '250', isCorrect: false },
    //         { text: '300', isCorrect: false },
    //         { text: '325', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In what decade was Madonna born?',
    //     choices: [
    //         { text: '1950s', isCorrect: true },
    //         { text: '1960s', isCorrect: false },
    //         { text: '1970s', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In what language is the phrase ‘Hakuna Matata’?',
    //     choices: [
    //         { text: 'Dutch', isCorrect: false },
    //         { text: 'Swahili', isCorrect: true },
    //         { text: 'Yoruba', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'And what is the meaning of ‘Hakuna Matata’?',
    //     choices: [
    //         { text: 'No worries', isCorrect: true },
    //         { text: 'Goodnight', isCorrect: false },
    //         { text: 'Thank you', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is King Charles III’s surname?',
    //     choices: [
    //         { text: 'Arthur', isCorrect: false },
    //         { text: 'Wales', isCorrect: false },
    //         { text: 'Mountbatten-Windsor', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What is the name of a duel with three people involved?',
    //     choices: [
    //         { text: 'A triage', isCorrect: false },
    //         { text: 'A truel', isCorrect: true },
    //         { text: 'A tryst', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many stars are on the United States flag?',
    //     choices: [
    //         { text: '50', isCorrect: true },
    //         { text: '51', isCorrect: false },
    //         { text: '52', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In which year was Slido founded?',
    //     choices: [
    //         { text: '2012', isCorrect: true },
    //         { text: '2016', isCorrect: false },
    //         { text: '2020', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who is credited with inventing the World Wide Web?',
    //     choices: [
    //         { text: 'Steve Jobs', isCorrect: false },
    //         { text: 'Bill Gates', isCorrect: false },
    //         { text: 'Tim Berners-Lee', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What type of computer was the first laptop computer?',
    //     choices: [
    //         { text: 'Apple Macintosh', isCorrect: false },
    //         { text: 'IBM PC', isCorrect: false },
    //         { text: 'Osborne 1', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What is the largest social media network in the world?',
    //     choices: [
    //         { text: 'Twitter', isCorrect: false },
    //         { text: 'Facebook', isCorrect: true },
    //         { text: 'Instagram', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who is considered the founder of modern computer science?',
    //     choices: [
    //         { text: 'Alan Turing', isCorrect: true },
    //         { text: 'Steve Jobs', isCorrect: false },
    //         { text: 'Bill Gates', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'The website Info.cern.ch is famous for what function?',
    //     choices: [
    //         { text: 'Being the predecessor for Wikipedia', isCorrect: false },
    //         { text: 'Being the world’s very first website', isCorrect: true },
    //         { text: 'Being the world’s first ever search engine', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What year was the iPhone first released in?',
    //     choices: [
    //         { text: '2007', isCorrect: true },
    //         { text: '2009', isCorrect: false },
    //         { text: '2010', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which video game console, first released in 2006, was the first to use motion controls during gameplay?',
    //     choices: [
    //         { text: 'Sega Megadrive', isCorrect: false },
    //         { text: 'Nintendo Wii', isCorrect: true },
    //         { text: 'Playstation', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'When was eBay founded?',
    //     choices: [
    //         { text: '1990', isCorrect: false },
    //         { text: '1995', isCorrect: true },
    //         { text: '2001', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'A green owl is the mascot for which app?',
    //     choices: [
    //         { text: 'Spotify', isCorrect: false },
    //         { text: 'Tinder', isCorrect: false },
    //         { text: 'Duolingo', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In which year did the Berlin Wall fall?',
    //     choices: [
    //         { text: '1987', isCorrect: false },
    //         { text: '1989', isCorrect: true },
    //         { text: '1990', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many times has the Mona Lisa been stolen?',
    //     choices: [
    //         { text: 'One', isCorrect: true },
    //         { text: 'Five', isCorrect: false },
    //         { text: 'Eight', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In Ancient Rome, how many days of the week were there?',
    //     choices: [
    //         { text: 'Five', isCorrect: false },
    //         { text: 'Six', isCorrect: false },
    //         { text: 'Eight', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What was New York’s original name?',
    //     choices: [
    //         { text: 'New Liverpool', isCorrect: false },
    //         { text: 'New Amsterdam', isCorrect: true },
    //         { text: 'New Brussels', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In what year did the Titanic sink?',
    //     choices: [
    //         { text: '1900', isCorrect: false },
    //         { text: '1912', isCorrect: true },
    //         { text: '1921', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Until 1981, Greenland was a colony of which country?',
    //     choices: [
    //         { text: 'France', isCorrect: false },
    //         { text: 'Spain', isCorrect: false },
    //         { text: 'Denmark', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'How many US presidents have been assassinated?',
    //     choices: [
    //         { text: 'Three', isCorrect: false },
    //         { text: 'Four', isCorrect: true },
    //         { text: 'Five', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the modern name for the island formerly known as Van Diemen’s Land?',
    //     choices: [
    //         { text: 'The Isle of Wight', isCorrect: false },
    //         { text: 'Tasmania', isCorrect: true },
    //         { text: 'Hawaii', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who was assassinated in New York in 1980?',
    //     choices: [
    //         { text: 'President John F Kennedy', isCorrect: false },
    //         { text: 'John Lennon', isCorrect: true },
    //         { text: 'Gianni Versace', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who painted The Last Supper?',
    //     choices: [
    //         { text: 'Leonardo Da Vinci', isCorrect: true },
    //         { text: 'Rembrandt', isCorrect: false },
    //         { text: 'Michelangelo', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which country does this flag belong to?',
    //     choices: [
    //         { text: 'The Isle of Man', isCorrect: false },
    //         { text: 'Wales', isCorrect: true },
    //         { text: 'Jersey', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which famous singer is this?',
    //     choices: [
    //         { text: 'Adam Ant', isCorrect: false },
    //         { text: 'Sam Smith', isCorrect: false },
    //         { text: 'Justin Timberlake', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which sporting event is this?',
    //     choices: [
    //         { text: 'The Grand Prix', isCorrect: false },
    //         { text: 'The Grand National', isCorrect: true },
    //         { text: 'The Superbowl', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which famous composer is this?',
    //     choices: [
    //         { text: 'Wolfgang Amadeus Mozart', isCorrect: false },
    //         { text: 'Ludwig van Beethoven', isCorrect: true },
    //         { text: 'Johann Sebastian Bach', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which country is this?',
    //     choices: [
    //         { text: 'Spain', isCorrect: false },
    //         { text: 'Portugal', isCorrect: true },
    //         { text: 'San Marino', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which city is this?',
    //     choices: [
    //         { text: 'Rotterdam', isCorrect: false },
    //         { text: 'Porto', isCorrect: true },
    //         { text: 'Palermo', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What breed of dog is this?',
    //     choices: [
    //         { text: 'Poodle', isCorrect: false },
    //         { text: 'Pomeranian', isCorrect: true },
    //         { text: 'Chihuahua', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What type of flower is this?',
    //     choices: [
    //         { text: 'Lily', isCorrect: false },
    //         { text: 'Rose', isCorrect: false },
    //         { text: 'Tulip', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which tech innovator is this as a baby?',
    //     choices: [
    //         { text: 'Jeff Bezos', isCorrect: false },
    //         { text: 'Mark Zuckerberg', isCorrect: false },
    //         { text: 'Larry Page', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which girl band is this?',
    //     choices: [
    //         { text: 'Destiny’s Child', isCorrect: true },
    //         { text: 'Sugababes', isCorrect: false },
    //         { text: 'En Vogue', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who wrote the epic poem Paradise Lost?',
    //     choices: [
    //         { text: 'William Shakespeare', isCorrect: false },
    //         { text: 'John Milton', isCorrect: true },
    //         { text: 'Mary Shelley', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many original James Bond novels were published?',
    //     choices: [
    //         { text: '12', isCorrect: true },
    //         { text: '15', isCorrect: false },
    //         { text: '21', isCorrect: false }
    //     ]
    // },
    // {
    //     question: '"Magnum opus" is a Latin phrase for what in literature?',
    //     choices: [
    //         { text: 'A love story', isCorrect: false },
    //         { text: 'An author\'s best work', isCorrect: true },
    //         { text: 'A tragedy', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who wrote Lolita?',
    //     choices: [
    //         { text: 'Anton Chekov', isCorrect: false },
    //         { text: 'Leo Tolstoy', isCorrect: false },
    //         { text: 'Vladimir Nabokov', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What was the bestselling book in the US in 2022?',
    //     choices: [
    //         { text: 'It Ends With Us by Colleen Hoover', isCorrect: true },
    //         { text: 'Where the Crawdads Sing by Delia Owens', isCorrect: false },
    //         { text: 'The Light We Carry by Michelle Obama', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many novels did Roald Dahl write?',
    //     choices: [
    //         { text: 'Seven', isCorrect: false },
    //         { text: 'Eleven', isCorrect: false },
    //         { text: 'Nineteen', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Where is Emily Bronte’s novel Wuthering Heights set?',
    //     choices: [
    //         { text: 'Yorkshire', isCorrect: true },
    //         { text: 'London', isCorrect: false },
    //         { text: 'Paris', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which author is the bestselling female author of all time, having sold two billion books?',
    //     choices: [
    //         { text: 'J.K. Rowling', isCorrect: false },
    //         { text: 'Agatha Christie', isCorrect: true },
    //         { text: 'Enid Blyton', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What was the first book ever ordered on Amazon?',
    //     choices: [
    //         { text: 'Don Quixote', isCorrect: false },
    //         { text: 'The Bible', isCorrect: false },
    //         { text: 'Fluid Concepts and Creative Analogies: Computer Models of the Fundamental Mechanisms of Thought', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Who is the female protagonist in The Hunger Games?',
    //     choices: [
    //         { text: 'Hermione Granger', isCorrect: false },
    //         { text: 'Nancy Drew', isCorrect: false },
    //         { text: 'Katniss Everdeen', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In what country was the Caesar salad invented?',
    //     choices: [
    //         { text: 'The US', isCorrect: false },
    //         { text: 'Poland', isCorrect: false },
    //         { text: 'Mexico', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What was the first fruit to be eaten on the Moon?',
    //     choices: [
    //         { text: 'Grapes', isCorrect: false },
    //         { text: 'A peach', isCorrect: true },
    //         { text: 'A starfruit', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the primary ingredient in hummus?',
    //     choices: [
    //         { text: 'Black beans', isCorrect: false },
    //         { text: 'Edamame beans', isCorrect: false },
    //         { text: 'Chickpeas', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In which Italian city was pizza first made?',
    //     choices: [
    //         { text: 'Naples', isCorrect: true },
    //         { text: 'Rome', isCorrect: false },
    //         { text: 'Palermo', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What are the top two most exported spices used in the world?',
    //     choices: [
    //         { text: 'Pepper and mustard', isCorrect: false },
    //         { text: 'Ginger and cinnamon', isCorrect: true },
    //         { text: 'Mustard and oregano', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which country has the most Michelin starred restaurants?',
    //     choices: [
    //         { text: 'India', isCorrect: false },
    //         { text: 'France', isCorrect: true },
    //         { text: 'Japan', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Where were French fries invented?',
    //     choices: [
    //         { text: 'France', isCorrect: false },
    //         { text: 'Belgium', isCorrect: true },
    //         { text: 'The US', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which is the only food that cannot go off – and can actually last forever?',
    //     choices: [
    //         { text: 'Peanut butter', isCorrect: false },
    //         { text: 'Honey', isCorrect: true },
    //         { text: 'Demerara sugar', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which fast food restaurant has the most branches in the world?',
    //     choices: [
    //         { text: 'McDonald’s', isCorrect: false },
    //         { text: 'Wendy’s', isCorrect: false },
    //         { text: 'Subway', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which country has the most number of vegetarian citizens?',
    //     choices: [
    //         { text: 'United Kingdom', isCorrect: false },
    //         { text: 'Brazil', isCorrect: false },
    //         { text: 'India', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which musical genre originated in Jamaica in the 1960s?',
    //     choices: [
    //         { text: 'Salsa', isCorrect: false },
    //         { text: 'Reggae', isCorrect: true },
    //         { text: 'Flamenco', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which instrument is associated with jazz legend Louis Armstrong?',
    //     choices: [
    //         { text: 'Trumpet', isCorrect: true },
    //         { text: 'Saxophone', isCorrect: false },
    //         { text: 'Piano', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which singer is known as the "Queen of Soul"?',
    //     choices: [
    //         { text: 'Aretha Franklin', isCorrect: true },
    //         { text: 'Diana Ross', isCorrect: false },
    //         { text: 'Whitney Houston', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which singer-songwriter released the album "21" in 2011?',
    //     choices: [
    //         { text: 'Adele', isCorrect: true },
    //         { text: 'Taylor Swift', isCorrect: false },
    //         { text: 'Beyoncé', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many Spice Girls were there in the original lineup?',
    //     choices: [
    //         { text: 'Four', isCorrect: false },
    //         { text: 'Five', isCorrect: true },
    //         { text: 'Six', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who composed the famous ballet, Swan Lake?',
    //     choices: [
    //         { text: 'Stravinsky', isCorrect: false },
    //         { text: 'Tchaikovsky', isCorrect: true },
    //         { text: 'Prokofiev', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which band released the album "Rumors" in 1977?',
    //     choices: [
    //         { text: 'Fleetwood Mac', isCorrect: true },
    //         { text: 'The Rolling Stones', isCorrect: false },
    //         { text: 'Queen', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who was the best-selling musical artist in the US in 2022?',
    //     choices: [
    //         { text: 'Justin Bieber', isCorrect: false },
    //         { text: 'Drake', isCorrect: true },
    //         { text: 'Taylor Swift', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Farrokh Bulsara was the real name of which singing legend?',
    //     choices: [
    //         { text: 'Jimi Hendrix', isCorrect: false },
    //         { text: 'Marc Bolan', isCorrect: false },
    //         { text: 'Freddie Mercury', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which artist has won the most Grammys, at 32?',
    //     choices: [
    //         { text: 'Tina Turner', isCorrect: false },
    //         { text: 'Beyoncé', isCorrect: true },
    //         { text: 'Eminem', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many bones does an adult human have?',
    //     choices: [
    //         { text: '200', isCorrect: false },
    //         { text: '206', isCorrect: true },
    //         { text: '216', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the smallest unit of matter?',
    //     choices: [
    //         { text: 'Atom', isCorrect: true },
    //         { text: 'Cell', isCorrect: false },
    //         { text: 'Molecule', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the primary gas that makes up the Earth’s atmosphere?',
    //     choices: [
    //         { text: 'Oxygen', isCorrect: false },
    //         { text: 'Nitrogen', isCorrect: true },
    //         { text: 'Carbon dioxide', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which of the following can’t an astronaut do in space?',
    //     choices: [
    //         { text: 'Cry', isCorrect: true },
    //         { text: 'Sleep', isCorrect: false },
    //         { text: 'Read', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the hardest natural substance on planet Earth?',
    //     choices: [
    //         { text: 'Gold', isCorrect: false },
    //         { text: 'Diamond', isCorrect: true },
    //         { text: 'Platinum', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which planet has 145 moons?',
    //     choices: [
    //         { text: 'Saturn', isCorrect: true },
    //         { text: 'Mars', isCorrect: false },
    //         { text: 'Mercury', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many bones do sharks have in their body?',
    //     choices: [
    //         { text: 'Zero', isCorrect: true },
    //         { text: '52', isCorrect: false },
    //         { text: '152', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which part of the human body has the most sweat glands?',
    //     choices: [
    //         { text: 'The armpit', isCorrect: false },
    //         { text: 'Feet', isCorrect: true },
    //         { text: 'Hands', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What color is the sunset on Mars?',
    //     choices: [
    //         { text: 'Red', isCorrect: false },
    //         { text: 'Pink', isCorrect: false },
    //         { text: 'Blue', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'How many humans have walked on the Moon?',
    //     choices: [
    //         { text: '12', isCorrect: true },
    //         { text: '14', isCorrect: false },
    //         { text: '18', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In which country was the game of chess invented?',
    //     choices: [
    //         { text: 'India', isCorrect: true },
    //         { text: 'China', isCorrect: false },
    //         { text: 'Greece', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which scientist invented penicillin?',
    //     choices: [
    //         { text: 'Alexander Fleming', isCorrect: true },
    //         { text: 'Alexander Graham Bell', isCorrect: false },
    //         { text: 'Thomas Edison', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which hair product was invented in 1950?',
    //     choices: [
    //         { text: 'Hair spray', isCorrect: true },
    //         { text: 'Hair straighteners', isCorrect: false },
    //         { text: 'Shampoo', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'When was the world’s first ATM introduced, in Enfield, UK?',
    //     choices: [
    //         { text: '1967', isCorrect: true },
    //         { text: '1977', isCorrect: false },
    //         { text: '1987', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Where were Venetian blinds invented?',
    //     choices: [
    //         { text: 'Persia', isCorrect: true },
    //         { text: 'Italy', isCorrect: false },
    //         { text: 'Scotland', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In which ancient civilization were scissors invented?',
    //     choices: [
    //         { text: 'Ancient Egypt', isCorrect: true },
    //         { text: 'Ancient Rome', isCorrect: false },
    //         { text: 'Ancient Greece', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'When was the first ever SMS text message sent?',
    //     choices: [
    //         { text: '1987', isCorrect: false },
    //         { text: '1990', isCorrect: false },
    //         { text: '1992', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In which year was the first submarine built, by Dutch engineer Cornelis Jacobszoon Drebbel?',
    //     choices: [
    //         { text: '1620', isCorrect: true },
    //         { text: '1750', isCorrect: false },
    //         { text: '1850', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What was the world’s first postage stamp, issued in the United Kingdom in 1840 called?',
    //     choices: [
    //         { text: 'Penny Farthing', isCorrect: false },
    //         { text: 'Penny Black', isCorrect: true },
    //         { text: 'Penny Red', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What did Charles Babbage famously invent?',
    //     choices: [
    //         { text: 'The computer', isCorrect: true },
    //         { text: 'The microwave', isCorrect: false },
    //         { text: 'The television', isCorrect: false }
    //     ]
    // },
    // Continue adding other questions in the same format
];

// Function to insert a question and its choices
const insertData = async () => {
    try {
        for (const item of data) {
            // Insert the question and get the inserted id
            const [result] = await pool.query('INSERT INTO Questions (question_text) VALUES (?)', [item.question]);
            const questionId = result.insertId;

            // Insert all choices for the question
            for (const choice of item.choices) {
                await pool.query('INSERT INTO Choices (question_id, choice_text, is_correct) VALUES (?, ?, ?)', [
                    questionId,
                    choice.text,
                    choice.isCorrect
                ]);
            }
        }
        console.log('All data inserted successfully.');
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        pool.end();  // Close the pool
    }
};

insertData();
