import Phaser, { CANVAS, Cameras } from 'phaser';
//import * as Matter from 'matter-js';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';


import 'phaser';
export default class Working extends Phaser.Scene {
    vertices:Array<object> = []
    circles: Phaser.GameObjects.Arc[] = []
    mouse = true;
    points ="";
    CAMERA_WIDTH :number=0;
    CAMERA_HEIGHT : number=0;
    constructor() {
      super('Working');  
    }
      
  create(){
    
    const verticiesData = {"shape":[[{"x":418.3501374841276,"y":195.91200630446798},{"x":417.38153469785493,"y":193.00623633839115},{"x":414.96002773217333,"y":188.16328639492977},{"x":418.8344388772639,"y":184.7732214345068},{"x":422.22454862921813,"y":181.86745146842998},{"x":425.6146583811724,"y":174.6030265532379},{"x":425.6146583811724,"y":168.79148662108423},{"x":426.0989597743087,"y":161.52706170589215},{"x":424.64605559489974,"y":156.19981676808462},{"x":420.28734305667285,"y":154.26263679070007},{"x":416.8972333047186,"y":154.7469317850462},{"x":413.50712355276437,"y":157.65270175112303},{"x":410.60131519394645,"y":158.62129173981532},{"x":407.6955068351285,"y":157.65270175112303},{"x":405.75830126258325,"y":152.80975180766166},{"x":403.3367942969017,"y":148.93539185289254},{"x":399.46238315181114,"y":149.41968684723867},{"x":396.07227339985684,"y":150.87257183027708},{"x":392.68216364790266,"y":151.84116181896937},{"x":389.77635528908473,"y":149.90398184158482},{"x":385.41764275085785,"y":146.998211875508},{"x":385.9019441439942,"y":143.608146915085},{"x":384.93334135772153,"y":139.7337869603159},{"x":380.0903274263584,"y":139.24949196596975},{"x":374.27871070872254,"y":139.7337869603159},{"x":365.5612856322688,"y":140.70237694900817},{"x":357.32816194895133,"y":139.7337869603159},{"x":352.0008466244518,"y":139.24949196596975},{"x":347.6421340862249,"y":138.2809019772775},{"x":342.7991201548617,"y":137.3123119885852},{"x":340.3776131891801,"y":140.21808195466204},{"x":336.98750343722594,"y":145.06103189812342},{"x":333.5973936852717,"y":145.54532689246957},{"x":328.7543797539085,"y":143.608146915085},{"x":328.7543797539085,"y":137.79660698293134},{"x":328.7543797539085,"y":131.98506705077767},{"x":327.30147557449953,"y":128.5950020903547},{"x":323.9113658225453,"y":127.62641210166242},{"x":321.4898588568637,"y":129.07929708470084},{"x":320.03695467745473,"y":134.8908370168545},{"x":318.09974910490945,"y":139.7337869603159},{"x":314.2253379598189,"y":143.12385192073887},{"x":313.7410365666826,"y":147.96680186420025},{"x":315.1939407460915,"y":154.7469317850462},{"x":314.70963935295526,"y":160.55847171719986},{"x":313.7410365666826,"y":164.43283167196898},{"x":310.3509268147284,"y":167.33860163804582},{"x":305.02361149022886,"y":170.72866659846878},{"x":303.0864059176836,"y":175.08732154758403},{"x":303.0864059176836,"y":181.86745146842998},{"x":305.5079128833652,"y":186.22610641754522},{"x":308.4137212421831,"y":191.0690563610066},{"x":310.3509268147284,"y":195.91200630446798},{"x":309.38232402845574,"y":201.23925124227551},{"x":304.53931009709254,"y":202.69213622531393},{"x":300.664898952002,"y":205.1136111970446},{"x":298.2433919863204,"y":205.1136111970446},{"x":294.3689808412298,"y":204.62931620269848},{"x":292.43177526868453,"y":207.5350861687753},{"x":291.9474738755482,"y":211.40944612354443},{"x":290.01026830300293,"y":214.7995110839674},{"x":286.6201585510487,"y":215.76810107265968},{"x":282.2614460128218,"y":216.2523960670058},{"x":281.29284322654917,"y":219.15816603308264},{"x":280.3242404402765,"y":224.9697059652363},{"x":279.3556376540039,"y":228.3597709256593},{"x":276.93413068832234,"y":231.26554089173612},{"x":276.449829295186,"y":236.59278582954363},{"x":275.9655279020497,"y":242.4043257616973},{"x":276.449829295186,"y":247.2472757051587},{"x":274.51262372264074,"y":251.60593065427395},{"x":274.51262372264074,"y":255.48029060904304},{"x":274.0283223295044,"y":258.870355569466},{"x":271.6068153638228,"y":260.32324055250444},{"x":268.2167056118686,"y":261.77612553554286},{"x":267.8349841404608,"y":264.78053537679807},{"x":270.20267984974174,"y":267.1481998031047},{"x":273.3596074621164,"y":268.7266427539758},{"x":273.3596074621164,"y":272.6727501311535},{"x":270.9919117528354,"y":275.4350252951779},{"x":269.4134479466481,"y":279.7757434100734},{"x":268.2296000920076,"y":284.1164615249689},{"x":269.8080638981949,"y":288.8517903775821},{"x":273.7542234136632,"y":290.824844066171},{"x":276.1219191229442,"y":291.6140655416066},{"x":275.3326872198505,"y":294.77095144334874},{"x":273.3596074621164,"y":297.1386158696554},{"x":271.78114365592904,"y":300.29550177139754},{"x":272.1757596074759,"y":306.60927357488185},{"x":277.7003829291315,"y":310.9499916897774},{"x":283.2250062507871,"y":310.9499916897774},{"x":288.3550136208959,"y":312.9230453783662},{"x":292.3011731363642,"y":315.2907098046729},{"x":296.6419486033793,"y":319.2368171818506},{"x":299.00964431266027,"y":321.999092345875},{"x":295.8527167002856,"y":323.97214603446383},{"x":291.51194123327053,"y":326.3398104607705},{"x":287.1711657662554,"y":328.31286414935937},{"x":284.0142381538808,"y":329.1020856247949},{"x":282.83039029924026,"y":325.1559782476172},{"x":281.25192649305296,"y":321.999092345875},{"x":276.9111510260378,"y":321.60448160815724},{"x":272.1757596074759,"y":321.999092345875},{"x":267.8349841404608,"y":324.7613675098994},{"x":264.2834405765393,"y":327.91825341164156},{"x":262.3103608188052,"y":331.0751393133837},{"x":265.8619043827266,"y":333.8374144774082},{"x":270.20267984974174,"y":334.2320252151259},{"x":269.8080638981949,"y":339.75657554317473},{"x":271.3865277043822,"y":343.30807218263465},{"x":274.5434553167569,"y":346.0703473466591},{"x":274.5434553167569,"y":349.621843986119},{"x":274.14883936521005,"y":352.77872988786123},{"x":277.30576697758465,"y":358.6978909536278},{"x":280.4626945899593,"y":363.433219806241},{"x":282.83039029924026,"y":367.37932718341875},{"x":285.9873179116149,"y":368.5631593965721},{"x":289.53886147553635,"y":365.8008842325477},{"x":291.90655718481736,"y":365.8008842325477},{"x":293.8796369425515,"y":370.9308238228787},{"x":294.66886884564514,"y":375.66615267549196},{"x":297.43118050647297,"y":380.40148152810525},{"x":300.9827240703944,"y":383.1637566921296},{"x":302.9558038281285,"y":385.1368103807185},{"x":301.3773400219412,"y":387.1098640693074},{"x":297.82579645801974,"y":387.5044748070251},{"x":296.24733265183244,"y":390.26674997104953},{"x":295.8527167002856,"y":394.1703521344788},{"x":299.00964431266027,"y":398.51107024937426},{"x":300.5881081188476,"y":402.85178836426974},{"x":297.43118050647297,"y":406.4032850037297},{"x":294.66886884564514,"y":408.3763386923186},{"x":292.695789087911,"y":414.29549975808516},{"x":294.66886884564514,"y":419.03082861069845},{"x":298.2204124095666,"y":423.76615746331163},{"x":303.35041977967535,"y":429.2907077913605},{"x":308.0858111982373,"y":431.6583722176671},{"x":313.6104345198929,"y":431.6583722176671},{"x":317.95120998690805,"y":433.63142590625597},{"x":319.9242897446422,"y":436.3937010702804},{"x":323.08121735701684,"y":439.55058697202253},{"x":323.8704492601105,"y":442.70747287376474},{"x":321.50275355082954,"y":445.46974803778915},{"x":321.50275355082954,"y":449.4158554149668},{"x":323.08121735701684,"y":452.9673520544268},{"x":325.4489130662978,"y":456.9134594316045},{"x":330.18430448485975,"y":458.4919023824756},{"x":333.34123209723435,"y":458.4919023824756},{"x":336.1035437580622,"y":462.43800975965326},{"x":339.2604713704368,"y":467.56794934998436},{"x":342.8120149343583,"y":468.7517815631377},{"x":346.7581744498266,"y":467.56794934998436},{"x":351.09894991684166,"y":465.59489566139547},{"x":353.8612615776695,"y":463.2272312350889},{"x":357.80742109313775,"y":459.2811238579111},{"x":360.9643487055124,"y":463.6218419728066},{"x":364.91050822098066,"y":466.7787278745488},{"x":369.6458996395426,"y":469.93561377629095},{"x":375.9597548642919,"y":470.7248352517265},{"x":378.3274505735729,"y":475.4601641043398},{"x":379.51129842821337,"y":480.195492956953},{"x":383.85207389522844,"y":482.16854664554194},{"x":388.5874653137904,"y":482.56315738325964},{"x":394.50670458699284,"y":482.16854664554194},{"x":398.847480054008,"y":482.16854664554194},{"x":401.60979171483575,"y":485.7200432850018},{"x":407.13441503649136,"y":486.5092647604374},{"x":411.4751905035065,"y":484.9308218095663},{"x":415.0267340674279,"y":484.14160033413077},{"x":417.39442977670893,"y":485.7200432850018},{"x":415.0267340674279,"y":487.69309697359074},{"x":412.5342657269673,"y":491.03082733913266},{"x":408.9827221630458,"y":493.7931025031571},{"x":407.79887430840535,"y":497.3445991426171},{"x":407.79887430840535,"y":503.2637602083836},{"x":410.5611859692332,"y":508.7883105364324},{"x":416.87504119398244,"y":513.129028651328},{"x":423.1888964187317,"y":518.258968241659},{"x":431.4758314012151,"y":523.38890783199},{"x":437.3950706744175,"y":524.967350782861},{"x":446.4712375599946,"y":526.1511829960144},{"x":453.17970873629065,"y":531.6757333240631},{"x":457.5204842033058,"y":536.4110621766765},{"x":462.65049157341457,"y":537.5948943898297},{"x":470.5428106043512,"y":537.200283652112},{"x":476.46204987755357,"y":536.4110621766765},{"x":481.59205724766235,"y":534.8326192258054},{"x":487.9059124724116,"y":534.0433977503699},{"x":491.85207198787987,"y":537.5948943898297},{"x":493.82515174561405,"y":541.1463910292897},{"x":496.5874634064419,"y":542.330223242443},{"x":498.1659272126292,"y":540.751780291572},{"x":499.7443910188165,"y":537.200283652112},{"x":502.11208672809744,"y":533.6487870126521},{"x":507.63671004975305,"y":531.2811225863454},{"x":512.372101468315,"y":531.2811225863454},{"x":517.8967247899707,"y":532.4649547994987},{"x":522.6321162085326,"y":533.2541762749343},{"x":524.9998119178135,"y":536.0164514389587},{"x":529.3405873848286,"y":536.4110621766765},{"x":534.4705947549373,"y":534.8326192258054},{"x":538.8113702219525,"y":537.5948943898297},{"x":541.1790659312335,"y":541.9356125047252},{"x":545.5198413982487,"y":544.6978876687497},{"x":550.2552328168106,"y":549.433216521363},{"x":553.4121604291852,"y":553.7739346362584},{"x":558.542167799294,"y":558.1146527511539},{"x":563.6721751694027,"y":560.4823171774605},{"x":567.2237187333242,"y":560.0877064397428},{"x":571.1698782487924,"y":557.7200420134361},{"x":574.3268058611671,"y":558.9038742265894},{"x":576.6945015704481,"y":562.8499816037671},{"x":577.8783494250886,"y":567.5853104563804},{"x":580.6406610859163,"y":571.1368070958404},{"x":585.7706684560252,"y":570.3475856204049},{"x":590.1114439230403,"y":565.6122567677916},{"x":594.8468353416022,"y":562.0607601283316},{"x":599.976842711711,"y":558.9038742265894},{"x":606.2906979364602,"y":559.2984849643072},{"x":609.8698029582476,"y":558.9038742265894},{"x":615.3944262799032,"y":558.5092634888716},{"x":620.9190496015588,"y":554.563156111694},{"x":622.892129359293,"y":550.2224379967985},{"x":621.7082815046525,"y":543.5140554555963},{"x":622.1028974561993,"y":539.1733373407009},{"x":624.4705931654803,"y":534.0433977503699},{"x":625.6544410201208,"y":528.518847422321},{"x":624.0759772139335,"y":523.38890783199},{"x":627.2329048263081,"y":519.4332170511819},{"x":632.7575281479637,"y":513.5140559854153},{"x":637.4929195665256,"y":506.4110627064955},{"x":637.0983036149787,"y":500.8865123784467},{"x":633.1521440995106,"y":495.3619620503979},{"x":629.2059845840422,"y":493.78351909952687},{"x":624.8652091170271,"y":491.0212439355024},{"x":621.3136655531057,"y":483.12902918114696},{"x":618.7660742969133,"y":477.908667358916},{"x":614.0306828783513,"y":473.9625599817383},{"x":608.9814361290763,"y":470.25896908936943},{"x":604.2460447105143,"y":467.8913046630628},{"x":597.1429575826714,"y":464.7344187613206},{"x":588.856022600188,"y":462.366754335014},{"x":581.7529354723451,"y":458.815257695554},{"x":574.6498483445022,"y":454.0799288429408},{"x":570.7036888290339,"y":448.555378514892},{"x":565.5736814589251,"y":445.00388187543206},{"x":561.23290599191,"y":443.4254389245609},{"x":554.1298188640671,"y":442.6362174491254},{"x":550.5782753001456,"y":439.47933154738325},{"x":549.3944274455051,"y":435.1386134324878},{"x":547.8159636393177,"y":430.4032845798745},{"x":545.05365197849,"y":428.03562015356783},{"x":541.8967243661154,"y":424.8787342518257},{"x":543.0805722207558,"y":420.93262687464795},{"x":548.2105795908647,"y":423.3002913009546},{"x":551.3675072032393,"y":420.5380161369302},{"x":550.9728912516924,"y":415.8026872843169},{"x":548.6051955424115,"y":412.25119064485693},{"x":544.6590360269432,"y":409.0943047431148},{"x":540.318260559928,"y":407.5158617922437},{"x":535.5828691413661,"y":405.9374188413726},{"x":530.8474777228042,"y":405.54280810365486},{"x":527.6905501104295,"y":406.7266403168082},{"x":524.1390065465081,"y":408.30508326767927},{"x":520.1928470310398,"y":405.1481973659371},{"x":518.6143832248524,"y":400.018257775606},{"x":519.798231079493,"y":392.9152644966862},{"x":516.2466875155715,"y":384.23382826689516},{"x":515.062839660931,"y":379.1038886765641},{"x":514.2736077578373,"y":372.395506135362},{"x":517.0359194186651,"y":369.2386202336198},{"x":519.0089991763994,"y":366.08173433187767},{"x":523.7443905949613,"y":368.4493987581843},{"x":529.6636298681636,"y":366.4763450695954},{"x":536.3721010444598,"y":365.29251285644216},{"x":542.6859562692091,"y":360.16257326611105},{"x":549.3944274455051,"y":356.61107662665114},{"x":555.3136667187075,"y":349.50808334773126},{"x":557.842883669656,"y":344.97693736540566},{"x":563.3675069913116,"y":341.4254407259457},{"x":565.7352027005926,"y":334.3224474470258},{"x":566.1298186521394,"y":327.61406490582374},{"x":564.5513548459521,"y":321.30029310233937},{"x":563.7621229428585,"y":317.7487964628794},{"x":562.578275088218,"y":313.01346761026616},{"x":559.8159634273902,"y":311.82963539711284},{"x":556.2644198634687,"y":312.61885687254835},{"x":553.1074922510941,"y":313.4080783479839},{"x":549.5559486871726,"y":311.82963539711284},{"x":545.6097891717043,"y":311.82963539711284},{"x":540.8743977531424,"y":313.8026890857017},{"x":536.3629138918378,"y":309.68532064835443},{"x":534.7844500856505,"y":305.7392132711767},{"x":532.0221384248227,"y":302.1877166317168},{"x":528.4705948609012,"y":299.0308307299746},{"x":528.4705948609012,"y":294.29550187736135},{"x":523.7352034423393,"y":291.13861597561913},{"x":519.789043926871,"y":290.7440052379014},{"x":515.8428844114028,"y":291.13861597561913},{"x":513.4751887021217,"y":294.29550187736135},{"x":510.3182610897471,"y":295.8739448282324},{"x":506.3721015742788,"y":294.6901126150791},{"x":503.21517396190416,"y":294.6901126150791},{"x":499.66363039798273,"y":295.0847233527969},{"x":497.2959346887018,"y":297.05777704138575},{"x":494.533623027874,"y":295.47933409051467},{"x":491.77131136704617,"y":291.9278374510547},{"x":491.77131136704617,"y":287.5871193361592},{"x":487.43053590003103,"y":286.00867638528814},{"x":484.66822423920325,"y":286.00867638528814},{"x":482.69514448146913,"y":288.3763408115948},{"x":478.8921319024244,"y":287.81046901370746},{"x":474.9459723869561,"y":284.6535831119653},{"x":469.8159650168473,"y":283.8643616365298},{"x":465.869805501379,"y":285.0481938496831},{"x":462.7128778890044,"y":286.6266368005542},{"x":459.9505662281766,"y":286.6266368005542},{"x":459.161334325083,"y":283.0751401610942},{"x":456.793638615802,"y":279.1290327839165},{"x":455.21517480961467,"y":276.3667576198921},{"x":455.6097907611615,"y":270.44759655412554},{"x":455.21517480961467,"y":265.3176569637945},{"x":450.87439934259953,"y":264.13382475064117},{"x":446.9282398271313,"y":264.92304622607674},{"x":440.61438460238196,"y":264.92304622607674},{"x":435.0897612807264,"y":264.528435488359},{"x":428.77590605597715,"y":264.13382475064117},{"x":424.435130588962,"y":264.92304622607674},{"x":420.8835870250405,"y":260.58232811118125},{"x":420.0943551219469,"y":253.8739455699791},{"x":416.5428115580254,"y":250.32244893051916},{"x":411.7982329868415,"y":249.53322745508362},{"x":406.6682256167328,"y":247.16556302877697},{"x":401.1436022950772,"y":244.4032878647526},{"x":394.0405151672342,"y":239.27334827442155},{"x":390.88358755485956,"y":235.32724089724385},{"x":389.6997397002191,"y":230.98652278234835},{"x":390.48897160331273,"y":227.04041540517062},{"x":392.85666731259374,"y":223.48891876571068},{"x":394.0405151672342,"y":218.35897917537963},{"x":398.38129063424935,"y":217.17514696222634},{"x":403.1166820528113,"y":217.56975769994412},{"x":407.8520734713732,"y":215.20209327363747},{"x":413.3766967930288,"y":214.01826106048415},{"x":418.9013201146845,"y":212.43981810961307},{"x":420.08516796932497,"y":207.30987851928202},{"x":419.2959360662313,"y":200.99610671579768}]]};
 
const body = this.matter.add.fromVertices(this.game.canvas.width/2, this.game.canvas.height/2, verticiesData.shape,{ isStatic: true });
    const sprite = this.add.sprite(483, 346.6, 'Kakheti');
    sprite.setInteractive();
    sprite.setTint(Phaser.Display.Color.HexStringToColor('#e47114').color);
    const mask = this.add.sprite(400, 200, 'Kakheti');
    mask.setTint(Phaser.Display.Color.HexStringToColor('#e47114').color);
    const scene = this;
    mask.setVisible(false);
    sprite.setScale(1.41);
    this.input.on('pointermove', function (pointer:any) {
      const x = pointer.worldX;
      const y = pointer.worldY;
              //@ts-ignore
          if (this.matter.containsPoint(body, x, y))
          {
            // sprite.mask = new Phaser.Display.Masks.BitmapMask(scene, mask);
            // mask.displayWidth = sprite.displayWidth;
            // mask.displayHeight = sprite.displayHeight;
            // mask.alpha =0.5;
            // mask.x = sprite.x;
            // mask.y = sprite.y;
            // mask.setVisible(true);
            scene.mousepointer();
            
            //sprite.input.cursor = 'pointer';
          }
          else
          {
            // if (sprite.mask) {
            //sprite.mask.destroy();
            scene.mousedefault();
          // }
            
          }
      

  }, this);
    
  }
  mousepointer(){
    this.game.canvas.style.cursor = 'pointer';
  }
  mousedefault(){
    this.input.setDefaultCursor('default');
  }
}
