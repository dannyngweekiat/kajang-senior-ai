/* One task per screen with authentic, highlighted app controls. */
Object.assign(window.workbookIcons,{close:'<path d="m6 6 12 12M18 6 6 18"/>'});
window.createMobileLesson = ({data, tx, t, esc, icon, announce, actionNames, stepIcons, lessonIcons}) => {
  const $=s=>document.querySelector(s);
  const screen=(file,y,h,marks=[],full=false)=>({file,y,h,marks,full});
  const inputMark={x:83,y:2192,w:930,h:120};
  const home=screen('01-chatgpt-home.png',0,2400,[inputMark],true),draft=screen('02-first-question-draft.png',1870,380,[{x:95,y:1960,w:900,h:160},{cx:955,cy:2175,r:59}]),answer=screen('03-first-answer.png',650,350);
  const promptFrame=(item,body)=>({title:['试着这样问','Try asking this'],body:body||['复制这段文字，再到 ChatGPT 的输入框粘贴。','Copy this text, then paste it into ChatGPT’s message box.'],icon:'copy',prompt:item.prompt,open:true});
  const control=(kind)=>{
    const shot={
      input:screen('01-chatgpt-home.png',2100,260,[{x:200,y:2192,w:530,h:120}]),
      send:screen('02-first-question-draft.png',1870,380,[{x:95,y:1960,w:900,h:160},{cx:955,cy:2175,r:59}]),
      copy:screen('03-first-answer.png',930,160,[{cx:69,cy:995,r:40}]),
      mic:screen('01-chatgpt-home.png',2155,195,[{cx:799,cy:2248,r:60}]),
      attach:screen('01-chatgpt-home.png',2155,195,[{cx:152,cy:2248,r:59}]),
      photos:screen('06-attachment-menu.png',1480,360,[{x:75,y:1680,w:550,h:110}]),
      private:screen('01-chatgpt-home.png',2155,195,[{cx:152,cy:2248,r:65,stop:true}])
    }[kind];if(kind==='send'){shot.x=870;shot.w=200;shot.y=2090;shot.h=170;shot.marks=[{cx:955,cy:2175,r:59}];}if(kind==='copy')shot.w=650;if(kind==='mic'){shot.x=540;shot.w=540;}if(kind==='photos')shot.w=850;shot.caption=['按标记操作','Follow the highlighted controls'];return shot;
  };
  const sendFrame=()=>({title:['发送问题','Send your question'],body:['按图中顺序：长按输入框粘贴，再点发送箭头。','Follow the marks: press and hold the message box to paste, then tap the send arrow.'],icon:'send',screen:control('send'),open:true,video:'send-question'});
  const copyFrame=()=>({title:['复制确认好的文字','Copy the text you’ve checked'],body:['点图中的复制按钮，方便稍后使用。','Tap the circled Copy button to use the text later.'],icon:'copy',screen:control('copy')});
  const saveImageFrames=(poster=false)=>[
    {title:['打开生成的图片','Open the generated image'],body:['点一下框出的图片。','Tap the outlined picture.'],icon:'image',screen:screen('12-cartoon-in-chat.png',900,960,[{x:42,y:918,w:918,h:920}])},
    {title:['点下载，保存到手机','Tap Download to save'],body:['点圈出的下载箭头。','Tap the circled download arrow.'],icon:'download',screen:{...screen('13-cartoon-download-control.png',130,220,[{cx:765,cy:225,r:64}]),x:300,w:780},video:'save-image'}
  ];
  const attachFrames=()=>[
    {title:['加入自己的产品照片','Attach your product photo'],body:['点圈出的加号，加入一张产品照片。','Tap the circled plus to add one product photo.'],icon:'image',screen:control('attach'),open:true},
    {title:['从相册选择照片','Choose from Photos'],body:['点图中框出的 Photos（相册），选择自己的产品照片。','Tap the highlighted Photos option and choose your product photo.'],icon:'image',screen:control('photos')}
  ];
  const exampleFrame=()=>({title:data.audience==='hawkers'?['海报参考','Poster example']:['感谢图参考','Thank-you example'],body:data.audience==='hawkers'?['参考这张海报，准备自己的四行资料。','Use this poster to prepare your own four lines.']:['看看感谢文字和画面，再准备自己的版本。','Check the words and picture, then plan your version.'],icon:'book',example:data.audience==='hawkers'?'poster':'greeting'});
  const flowShot=(file,y,h,marks=[],full=false)=>({...screen(file+'.jpg',y,h,marks,full),folder:'flow',width:390,height:844,w:390,app:'Google Flow',stroke:3,caption:['Google Flow 手机网页操作','Google Flow mobile web controls']});
  const nativeFlowShot=(file,y,h,marks=[],height=1200)=>({...screen(file+'.jpg',y,h,marks),folder:'flow',width:540,height,w:540,app:file.startsWith('native-select')||file==='native-confirm'?'Android photo picker':'Google Flow',stroke:4,caption:['Android 手机操作','Android phone controls']});
  const flowFrames=item=>{const hawker=data.audience==='hawkers';return [
    {title:hawker?['准备一张产品照片','Choose a product photo']:['选一张小猫图片','Choose your cat picture'],body:hawker?['准备清楚的产品照，想好三句短文案：商品名、实际价格和订购方式。','Prepare a clear product photo and three short lines: product name, actual price and how to order.']:['用刚才保存的感谢图，也可以点「保存参考图」把这张图片存到手机。','Use your saved thank-you picture, or tap Save example picture to save this one to your phone.'],icon:'image',...(hawker?{}:{example:'greeting',referenceDownload:true})},
    {title:['打开 Google Flow 网页','Open Google Flow'],body:['用手机浏览器打开 flow.google.com，用自己的 Google 账号登录。这一课使用网页。','Open flow.google.com in your phone browser and sign in with your Google account. This lesson uses the website.'],icon:'globe',open:true},
    {title:['新建项目','Start a new project'],body:['点框出的 New project（新项目）。','Tap the highlighted New project button.'],icon:'video',screen:flowShot('home',630,180,[{x:96,y:657,w:198,h:135}])},
    {title:['打开视频设置','Open the video settings'],body:['点输入框右下方框出的位置。','Tap the highlighted settings beside the prompt box.'],icon:'video',screen:flowShot('project',712,110,[{x:180,y:774,w:153,h:42}])},
    {title:['选择 Video','Choose Video'],body:['点框出的 Video（视频）。','Tap the highlighted Video option.'],icon:'video',screen:flowShot('settings',508,263,[{x:180,y:522,w:142,h:38}])},
    {title:['选择 Frames','Choose Frames'],body:['点框出的 Frames，用一张图片作为短片开头。','Tap Frames to use a picture as the first frame.'],icon:'image',screen:flowShot('settings',508,263,[{x:40,y:559,w:140,h:38}])},
    {title:['选择竖屏','Choose a vertical video'],body:['点框出的 9:16。','Tap the highlighted 9:16 option.'],icon:'phone',screen:flowShot('settings',508,263,[{x:181,y:599,w:140,h:44}])},
    ...(hawker?[
      {title:['选择 Omni 1.2 Flash','Choose Omni 1.2 Flash'],body:['打开模型菜单，点 Omni 1.2 Flash。','Open the model menu and tap Omni 1.2 Flash.'],icon:'video',screen:flowShot('promo-model-menu',274,73,[{x:42,y:283,w:280,h:40}])},
      {title:['选择 720p','Choose 720p'],body:['点 720p，让产品和文字更清楚。','Tap 720p for clearer product details and text.'],icon:'video',screen:flowShot('promo-10s-settings',585,48,[{x:181,y:588,w:142,h:39}])},
      {title:['设为10秒','Set the length to 10 seconds'],body:['拖动 Length 滑块，直到显示 10 Sec。','Drag the Length slider until it shows 10 Sec.'],icon:'video',screen:flowShot('promo-10s-settings',620,62,[{x:42,y:626,w:281,h:46}])},
      {title:['选择一个作品','Choose one output'],body:['点 x1，每次只做一个短片。','Tap x1 to make one video at a time.'],icon:'video',screen:flowShot('promo-10s-settings',677,48,[{x:42,y:681,w:70,h:38}])}
    ]:[{title:['选一个作品','Choose one output'],body:['模型选 Veo 3.1 - Lite，作品数量选 x1。','Choose Veo 3.1 - Lite and x1 for one video.'],icon:'check',screen:flowShot('settings',640,132,[{x:40,y:646,w:282,h:39},{x:40,y:687,w:71,h:38}])}]),
    {title:['加入第一张图片','Add your first frame'],body:['点设置外的空白处收起菜单，再点框出的 Start（首帧）。End（尾帧）留空。','Tap outside the settings to close them, then tap Start. Leave End empty.'],icon:'image',screen:hawker?flowShot('promo-first-frame',655,105,[{x:34,y:668,w:59,h:59}]):flowShot('frames',646,176,[{x:33,y:664,w:59,h:61}])},
    {title:['打开手机相册','Choose a picture from your phone'],body:['点圈出的上传箭头，打开手机的照片选择画面。','Tap the circled upload arrow to open your phone’s photo picker.'],icon:'image',screen:flowShot('upload',55,92,[{cx:360,cy:93,r:22}])},
    {title:['选择图片','Select your picture'],body:hawker?['点自己的产品照片。','Tap your product photo.']:['点刚才保存的小猫图片。','Tap the cat picture you saved.'],icon:'image',screen:nativeFlowShot(hawker?'native-select-product':'native-select-cat',150,350,[{x:hawker?181:1,y:322,w:178,h:178}])},
    {title:['确认照片','Confirm the photo'],body:['选好一张图片后，点 Add (1)（加入一张）。','After choosing one picture, tap Add (1).'],icon:'check',screen:nativeFlowShot('native-confirm',0,170,[{x:366,y:73,w:154,h:52}],170)},
    {title:['首次上传时的提示','First-upload notice'],body:['如果出现这个提示，先阅读内容。确认自己有权使用这张图片，并同意提示内容后，再点 I agree。','If this notice appears, read it first. Tap I agree only after confirming you have the right to use the picture and agree to the notice.'],icon:'check',screen:nativeFlowShot('native-rights',510,330,[{x:404,y:754,w:87,h:50}])},
    {title:['加入上传好的图片','Add the uploaded picture'],body:['等待上传完成，再点图片，把它加入首帧。','Wait for the upload to finish, then tap the picture to add it as the first frame.'],icon:'image',screen:nativeFlowShot(hawker?'native-uploaded-product':'native-uploaded-cat',280,180,[{x:16,y:316,w:300,h:65}])},
    {title:['确认选对图片','Check your selected picture'],body:['看看左边的小图是不是你选的图片。','Check that the first-frame thumbnail shows the picture you chose.'],icon:'check',screen:hawker?flowShot('promo-attached',655,105,[{x:34,y:668,w:59,h:59}]):flowShot('attached',646,176,[{x:32,y:663,w:63,h:64}])},
    {title:hawker?['加上宣传文案','Add the promo wording']:['告诉 Flow 怎样动','Describe the movement'],body:['复制这段文字，切回刚才的 Flow 标签页，长按输入框，再点粘贴。','Copy this text. Return to your existing Flow tab, press and hold the prompt box, then tap Paste.'],icon:'copy',prompt:item.prompt},
    {title:['检查额度花费','Check the credit cost'],body:['打开设置，看看这次需要多少额度。确认只生成一个作品，自己的额度也足够。','Open settings and check the cost for this generation. Confirm one output and that your balance covers it.'],icon:'check',screen:hawker?flowShot('promo-10s-settings',717,41,[{x:78,y:720,w:218,h:30}]):flowShot('settings',681,90,[{x:75,y:726,w:217,h:36}])},
    {title:['生成一次，等候作品','Generate once and wait'],body:['点设置外的空白处收起菜单，再点圈出的生成箭头一次。等待短片出现。','Tap outside settings to close them, then tap the circled generation arrow once. Wait for the clip to appear.'],icon:'send',screen:hawker?{...flowShot('prompt',750,72,[{cx:350,cy:796,r:23}]),x:316,w:70}:flowShot('prompt',588,234,[{cx:350,cy:796,r:23}])},
    {title:['播放检查','Play and check'],body:hawker?['播放短片，逐字核对商品名、价格和订购提醒。检查文字清楚易读，产品外观也正确，再用来宣传。','Play the clip and check the product name, price and ordering message word by word. Make sure the text is easy to read and the product looks right before using it.']:['点生成的短片，再点播放。看看小猫的动作和画面，有没有裁掉想保留的部分。','Open the generated clip and tap Play. Check the cat’s movement and whether anything you wanted to keep was cropped.'],icon:'play',outputExample:data.recordings?.examples?.[item.id],screen:flowShot(hawker?'promo-playback':'playback-cat',670,110,[{cx:44,cy:741,r:18}])},
    {title:['打开下载菜单','Open the download menu'],body:['点右上角三点，再点 Download media（下载）。','Tap the top-right three dots, then Download media.'],icon:'download',screen:flowShot(hawker?'promo-more':'more-cat',8,231,[{cx:269,cy:38,r:18},{x:88,y:143,w:179,h:40}])},
    {title:['保存原尺寸短片','Save the original video'],body:['点 Original size（原尺寸），保存短片。','Tap Original size to save the video.'],icon:'download',screen:flowShot(hawker?'promo-download':'download-cat',140,178,[{x:204,y:210,w:180,h:53}])},
    {title:hawker?['配上产品文案','Add your product caption']:['把小猫送给亲友','Share a little smile'],body:hawker?['在手机下载记录或文件中播放保存的短片。分享时可补充营业资料，并注明画面由 AI 制作。','Play the saved clip from Downloads or Files. Add opening details when sharing, and identify the visuals as AI-generated.']:['在浏览器下载记录或手机文件中找到短片。可以分享给亲友，写「用 AI 做的小猫短片，送你一个微笑」。','Find the clip in browser downloads or Files. Share it with family or friends with “A little AI cat video to make you smile.”'],icon:'play'}
  ];};
  const baseFramesFor=item=>{
    if(item.id==='video'||item.id==='flow-fun')return flowFrames(item);
    if(item.id==='first')return [
      {title:['打开 ChatGPT','Open ChatGPT'],body:['用自己的账号登录，找到框出的输入框。','Sign in with your own account and find the outlined message box.'],icon:'chat',screen:home,open:true},
      promptFrame(item),sendFrame(),
      {title:['读一读，再接着问','Read and follow up'],body:['读过回答后，可以发送这句话。','Read the reply, then try this follow-up.'],icon:'chat',screen:answer,prompt:['请说得更口语一点。','Please make it more conversational.'],open:true}
    ];
    if(item.id==='voice')return [
      {title:['点麦克风','Tap the microphone'],body:['点应用或键盘的麦克风。首次使用时，允许使用麦克风。','Tap the app or keyboard microphone. Allow microphone access if asked.'],icon:'mic',screen:control('mic')},
      promptFrame(item,['清楚地说出这句话。','Say this sentence clearly.']),
      {title:['核对文字，再发送','Check the words, then send'],body:['看看名字、数字和地点有没有听错，再点发送箭头。','Check names, numbers and places, then tap the send arrow.'],icon:'send',screen:control('send'),open:true,video:'send-question'},copyFrame()
    ];
    if(item.id==='business-copy')return [
      {title:['准备产品资料','Prepare your product details'],body:item.steps[0],icon:'list'},promptFrame(item),sendFrame(),
      {title:['核对资料','Check the details'],body:['检查价格、时间和订购方式，删掉没有提供的优惠。','Check price, time and ordering details. Remove offers you did not provide.'],icon:'check'},copyFrame()
    ];
    if(item.id==='poster')return [
      {title:['准备照片和文字','Prepare your photo and wording'],body:item.steps[0],icon:'camera'},exampleFrame(),...attachFrames(),promptFrame(item),sendFrame(),
      {title:['检查海报','Check your poster'],body:['核对价格、文字和产品外观。要修改时，说清楚要改哪里。','Check price, wording and product appearance. Describe any correction you need.'],icon:'check'},
      ...saveImageFrames()
    ];
    if(item.id==='greeting')return [exampleFrame(),promptFrame(item),sendFrame(),
      {title:['检查感谢图','Check your thank-you picture'],body:['看看文字有没有错字，画面是否合适。','Check spelling and whether you like the picture.'],icon:'check'},...saveImageFrames()
    ];
    if(item.id==='photo')return [
      {title:['选一张照片','Choose a photo'],body:['选清楚的菜单或物品照片，避开私人资料。','Choose a clear menu or object photo without private details.'],icon:'camera'},
      {title:['点加号','Tap plus'],body:['点框出的加号，加入照片。','Tap the highlighted plus to add a photo.'],icon:'image',screen:control('attach'),open:true},
      {title:['选择 Photos','Choose Photos'],body:['打开相册，选一张照片。','Open Photos and choose one picture.'],icon:'image',screen:control('photos')},
      promptFrame(item,['加上这个问题。','Add this question.']),
      {title:['确认照片','Check the photo'],body:['确认选对了照片。','Check that you selected the right picture.'],icon:'image',screen:screen('07-photo-question-draft.png',1410,410,[{x:53,y:1455,w:282,h:315}])},
      {title:['发送照片和问题','Send the photo and question'],body:['点圈出的发送箭头。','Tap the circled send arrow.'],icon:'send',screen:screen('07-photo-question-draft.png',1995,170,[{cx:980,cy:2074,r:58}]),open:true},
      {title:['对照照片，核对回答','Check the reply against the photo'],body:['参考菜单：咖椰角 RM10、咖啡 RM3、炒米粉 RM6。对照图中的回答，看看有没有看错或猜测。','Practice menu: kaya puffs RM10, coffee RM3, fried bee hoon RM6. Compare it with this reply for mistakes or guesses.'],icon:'check',screen:screen('08-photo-answer-and-limit.png',710,410)}
    ];
    if(item.id==='social')return [promptFrame(item),sendFrame(),
      {title:['核对并复制帖文','Check and copy the captions'],body:['核对价格、时间和订购方式，再点复制。','Check price, time and ordering details, then tap Copy.'],icon:'copy',screen:control('copy')},
      {title:['请 ChatGPT 安排七天主题','Ask for seven post topics'],body:['把这句话发在同一个聊天里。','Send this in the same chat.'],icon:'calendar',prompt:['请安排七天帖文主题，每天一个，包含产品、制作、常见问题、包装、营业资料、产品细节和反馈。','Plan seven post topics, one per day: product, preparation, questions, packaging, opening details, product detail and feedback.'],open:true},
      {title:['保存计划','Keep the plan'],body:['检查主题是否适合自己的生意，再点复制。','Check the topics suit your business, then tap Copy.'],icon:'copy',screen:control('copy')}
    ];
    if(item.id==='daily')return [
      {title:['想好人数和预算','Choose your numbers and budget'],body:['把提问中的人数、预算和食材换成自己的。','Adjust the people, budget and ingredients in the example.'],icon:'list'},promptFrame(item),sendFrame(),
      {title:['核对并保存清单','Check and save your list'],body:['检查数量和做法，需要时复制清单。价格以店里为准；过敏或用药问题请问专业人士。','Check quantities and cooking steps, then copy the list if you need it. Confirm shop prices; ask a professional about allergies or medicines.'],icon:'copy',screen:control('copy')}
    ];
    if(item.id==='safe')return [
      {title:['保管私人资料','Keep private details safe'],body:item.steps[0],icon:'shield',screen:control('private')},
      {title:['重要资料，再核实','Check important information'],body:['价格、日期和建议另找可靠来源确认。声音和照片也可能伪造，联系本人时用熟悉的号码。','Verify prices, dates and advice with reliable sources. Voices and photos can be fake; contact people using a trusted number.'],icon:'check'},
      {title:['遇到可疑来电，怎么做？','What would you do with this call?'],body:['选一个做法。','Choose an action.'],icon:'shield',quiz:true}
    ];
    return item.steps.map((body,i)=>({title:['跟着做','Follow along'],body,icon:stepIcons[item.id]?.[i]||lessonIcons[item.id]}));
  };
  const framesFor=item=>{const original=baseFramesFor(item);const frames=item.stages?item.stages.flatMap(spec=>{if(!spec.reuse)return [spec];let matches=spec.reuse==='PROMPT'?[promptFrame(item)]:spec.reuse==='SEND'?[sendFrame()]:spec.reuse==='SAVE'?saveImageFrames():spec.reuse==='ATTACH'?attachFrames():spec.reuse==='EXAMPLE'?[exampleFrame()]:original.filter(f=>f.title[1]===spec.reuse);if(!matches.length)throw new Error('Missing stage '+item.id+':'+spec.reuse);return matches.map(f=>({...f,...spec}));}):original;return frames.map(f=>{const revised=item.stages&&!item.id.startsWith('avatar-');const demo=revised?null:data.recordings?.clips?.[item.id+':'+f.title[1]];return demo?{...f,demo}:f;});};
  let active=0,frames=[],item;
  const isFlow=()=>item?.section==='flow';
  const openButton=()=>`<a class="button stage-open" href="${item?.platform==='flow-app'?'#tools':isFlow()?'https://flow.google.com/':'https://chatgpt.com/'}" target="_blank" rel="noopener noreferrer">${icon(isFlow()?'video':'chat','small')}${tx(isFlow()?['打开 Google Flow','Open Google Flow']:['打开 ChatGPT','Open ChatGPT'])}${icon('arrow','small')}</a>`;
  const copyButton=()=>`<button type="button" class="primary" id="mobile-copy">${icon('copy','small')}<span>${tx(frames[active]?.parts?['复制全文','Copy all']:['复制文字','Copy text'])}</span></button>`;
  function visual(s){
    const annotations=s.marks.map(m=>{if(m.stop)return '<g class="image-stop"><circle cx="'+m.cx+'" cy="'+m.cy+'" r="'+m.r+'"/><path d="M'+(m.cx-m.r*.7)+' '+(m.cy-m.r*.7)+' '+(m.cx+m.r*.7)+' '+(m.cy+m.r*.7)+'"/></g>';
      const outline=m.r?'<circle cx="'+m.cx+'" cy="'+m.cy+'" r="'+m.r+'"/>':'<rect x="'+m.x+'" y="'+m.y+'" width="'+m.w+'" height="'+m.h+'" rx="24"/>';
      return '<g class="image-highlight"'+(s.stroke?' style="stroke:#f7ce62;stroke-width:'+s.stroke+'"':'')+'>'+outline+'</g>';
    }).join('');
    return '<figure class="stage-figure '+(s.full?'full-app-figure':'')+'"><div class="screen-window"><svg viewBox="'+(s.x||0)+' '+s.y+' '+(s.w||1080)+' '+s.h+'" role="img" aria-label="'+(s.alt?tx(s.alt):tx(s.app==='Android photo picker'?['Android 照片选择画面，操作位置已标出','Android photo picker, with the relevant controls highlighted']:s.app?['Google Flow 手机网页，操作位置已标出','Google Flow mobile website, with the relevant controls highlighted']:s.full?['ChatGPT 完整画面，输入区已用框标出','Full ChatGPT screen, with the message area outlined']:s.marks.length?['ChatGPT 实际画面；操作位置已用圈或框标出','Actual ChatGPT screen; relevant controls are circled or outlined']:['ChatGPT 实际回答的局部画面','Detail of an actual ChatGPT reply']))+'"><image href="assets/'+(s.folder||'screens')+'/'+esc(s.file)+'" width="'+(s.width||1080)+'" height="'+(s.height||2400)+'"/>'+annotations+'</svg></div><figcaption>'+tx(s.caption||['ChatGPT 操作示例','ChatGPT example'])+'</figcaption></figure>';
  }
  const exampleImage=(file,caption)=>'<figure class="reference-figure"><img width="1024" height="1024" src="assets/examples/'+esc(file)+'" alt="'+tx(caption)+'"><figcaption>'+tx(caption)+'</figcaption></figure>';
  function styleExamples(){const h=data.audience==='hawkers';return '<div class="style-examples">'+exampleImage(data.plan.referenceFiles[document.documentElement.lang==='en'?1:0],h?['温暖传统 · 虚构海报参考','Warm and traditional · fictional poster']:['柔和水彩 · 感谢图参考','Soft watercolour · thank-you example'])+(h?'<figure class="reference-figure prepared-layout"><strong>'+tx(['咖椰角','Kaya puffs'])+'</strong><img width="1024" height="1024" src="assets/examples/product-layout-photo.png" alt="'+tx(['AI 生成的咖椰角示意图','AI-generated kaya puff illustration'])+'"><p>'+tx(['一盒 RM10 · 私讯订购','RM10 · Message us'])+'</p><figcaption>'+tx(['简洁版面参考','Simple layout example'])+'</figcaption></figure>':exampleImage('seniors-thank-you.png',['活泼卡通 ·「谢谢你」','Playful cartoon · “Thank you”']))+'</div>';}
  function referenceExample(kind){return exampleImage(data.plan.referenceFiles[document.documentElement.lang==='en'?1:0],data.plan.referenceCaption);}
  const similarActivities = {
  "first": {
    "hawkers": [
      [
        "为我的小吃摊想三个容易记住的名字。",
        "Suggest three memorable names for my food stall."
      ],
      [
        "帮我写一句欢迎顾客光临的话。",
        "Write a friendly welcome message for my customers."
      ],
      [
        "帮我把「今天卖完了」说得亲切一点。",
        "Give me a friendly way to say we have sold out today."
      ]
    ],
    "seniors": [
      [
        "推荐三种下雨天可以在家做的活动。",
        "Suggest three things to do at home on a rainy day."
      ],
      [
        "用简单的话介绍加影沙爹。",
        "Tell me about Kajang satay in simple words."
      ],
      [
        "帮我写一句邀请朋友喝茶的信息。",
        "Write a short message inviting a friend for tea."
      ]
    ]
  },
  "voice": {
    "hawkers": [
      [
        "说出今天的优惠，请 ChatGPT 整理成一句宣传语。",
        "Describe today’s offer and ask ChatGPT to turn it into a short promotion."
      ],
      [
        "说出产品的特色，请它写一段产品介绍。",
        "Describe what makes your product special and ask for a short introduction."
      ],
      [
        "说出顾客常问的问题，请它拟一句亲切的回复。",
        "Say a question customers often ask and request a friendly reply."
      ]
    ],
    "seniors": [
      [
        "说出想对家人说的话，请 ChatGPT 整理成一条信息。",
        "Say what you want to tell your family and ask ChatGPT to turn it into a message."
      ],
      [
        "说出冰箱里有的食材，问问可以煮什么。",
        "Name the ingredients in your fridge and ask what you could cook."
      ],
      [
        "说出一句华语，请它翻译成马来语。",
        "Say a sentence in Mandarin and ask for a Malay translation."
      ]
    ]
  },
  "business-copy": [
    [
      "为今天的新产品写一段简短介绍。",
      "Write a short introduction for today’s new product."
    ],
    [
      "把同一段宣传文字改成马来语。",
      "Rewrite the same promotion in Malay."
    ],
    [
      "写一条通知，告诉顾客今天提早收档。",
      "Write a message telling customers you are closing early today."
    ]
  ],
  "poster": [
    [
      "用同一张产品照，设计一张新品上市海报。",
      "Use the same product photo to make a new-product poster."
    ],
    [
      "设计一张节日预订海报，写上实际截止日期。",
      "Make a festive pre-order poster with your actual order deadline."
    ],
    [
      "设计一张营业时间海报，清楚列出营业日和时间。",
      "Make an opening-hours poster with your actual days and times."
    ]
  ],
  "video": [
    [
      "用产品照片做一条慢慢拉近镜头的短片。",
      "Make a video that slowly moves closer to your product photo."
    ],
    [
      "用同一张照片做一条镜头轻轻横移的短片。",
      "Make another version with a gentle sideways camera movement."
    ],
    [
      "用另一款产品的照片，做一条风格相同的宣传短片。",
      "Use a different product photo to make a promotion in the same style."
    ]
  ],
  "social": [
    [
      "为下周的新品写两段不同风格的帖文。",
      "Write two posts in different styles for next week’s new product."
    ],
    [
      "把一段宣传文字改成适合 WhatsApp 的简短信息。",
      "Turn a promotion into a short WhatsApp message."
    ],
    [
      "围绕一款产品，安排三天不同主题的帖文。",
      "Plan three days of posts about one product, each with a different theme."
    ]
  ],
  "photo": [
    [
      "拍一张包装上的储存说明，请 ChatGPT 解释，再对照原文。",
      "Photograph storage instructions on a package, ask for an explanation and compare it with the label."
    ],
    [
      "拍一张植物照片，问问可能是什么植物，再查证。",
      "Photograph a plant, ask what it might be and check the suggestion."
    ],
    [
      "拍一张没有私人资料的招牌，请它翻译图中的文字。",
      "Photograph a sign without private details and ask for a translation."
    ]
  ],
  "greeting": [
    [
      "做一张邀请朋友喝茶的图片。",
      "Make a picture inviting a friend for tea."
    ],
    [
      "做一张给家人的生日祝福图。",
      "Make a birthday picture for someone in your family."
    ],
    [
      "做一张「周末愉快」的小动物插画。",
      "Make an animal illustration that says “Have a lovely weekend”."
    ]
  ],
  "flow-fun": [
    [
      "让同一只小猫轻轻挥挥手，镜头保持不动。",
      "Make the same cat gently wave, keeping the camera still."
    ],
    [
      "让一张花朵图片里的花轻轻随风摆动。",
      "Make the flowers in a picture gently sway in the breeze."
    ],
    [
      "让一张风景图片里的云慢慢飘动。",
      "Make the clouds in a landscape picture drift slowly."
    ]
  ],
  "daily": [
    [
      "按两个人的份量，准备一份早餐采购清单。",
      "Make a breakfast shopping list for two people."
    ],
    [
      "安排一个轻松的周末下午，留出休息时间。",
      "Plan a relaxed weekend afternoon with time to rest."
    ],
    [
      "为两天一夜的小旅行列一份行李清单。",
      "Make a packing list for a one-night trip."
    ]
  ],
  "safe": [
    [
      "请 ChatGPT 列出可疑中奖信息的常见特征。",
      "Ask ChatGPT for common signs of a suspicious prize message."
    ],
    [
      "用虚构的例子，问问哪些个人资料不适合上传。",
      "Use a fictional example to ask which personal details should stay private."
    ],
    [
      "请它建议查证消息的方法，再到可靠来源核实。",
      "Ask how to check a claim, then verify it with trusted sources."
    ]
  ]
};
  function activityIdeas(){if(item.activities)return item.activities.map(a=>a.body);const entry=similarActivities[item.id];return Array.isArray(entry)?entry:entry[data.audience];}
  function videoHTML(key,label){return '<details class="stage-video"><summary>'+icon('play','small')+tx(['看操作短片','Watch a short demo'])+'</summary><video controls playsinline preload="none" poster="assets/videos/'+key+'-poster.jpg" aria-label="'+tx(label||(key==='save-image'?['保存图片示范','Saving a picture']:['发送问题示范','Sending a question']))+'"><source src="assets/videos/'+key+'.mp4" type="video/mp4"><track kind="captions" src="assets/videos/'+key+'.zh.vtt" srclang="zh" label="中文" '+(document.documentElement.lang==='en'?'':'default')+'><track kind="captions" src="assets/videos/'+key+'.en.vtt" srclang="en" label="English" '+(document.documentElement.lang==='en'?'default':'')+'></video></details>';}
  function outputVideoHTML(example){return '<details class="stage-video output-video"><summary>'+icon('play','small')+tx(['看短片示例','Watch the video example'])+'</summary><figure class="reference-figure"><video controls playsinline preload="metadata" poster="assets/examples/'+esc(example.poster)+'" aria-label="'+tx(example.caption)+'"><source src="assets/examples/'+esc(example.file)+'" type="video/mp4"></video><figcaption>'+tx(example.caption)+'</figcaption></figure></details>';}
  function frameHTML(f){const demo=f.demo,videoKey=demo?.key||f.video;return `<div class="stage-heading"><span class="stage-icon">${icon(f.icon)}</span><h2 id="frame-heading" tabindex="-1">${tx(f.title)}</h2></div><p class="stage-instruction">${tx(f.body)}</p>${videoKey?'<p class="video-instruction">'+tx(demo?.instruction||(f.video==='save-image'?['点下载箭头。','Tap the download arrow.']:['点发送箭头。','Tap the send arrow.']))+'</p>':''}${f.toolLinks?'<a class="button" href="#tools">'+tx(['查看官方下载链接','Official app download links'])+'</a>':''}${f.officialAvatar?'<a class="text-link" href="https://support.google.com/flow/answer/17102997?hl=en" target="_blank" rel="noopener noreferrer">'+tx(['查看 Google 官方步骤','Read Google’s official steps'])+'</a>':''}${f.screen?visual(f.screen):''}${!f.screen&&demo&&!f.prompt&&!f.example?'<figure class="stage-figure demo-poster"><img src="assets/videos/'+esc(demo.key)+'-poster.jpg" alt="'+tx(demo.title)+'"></figure>':''}${f.styleExamples?styleExamples():''}${f.example?referenceExample(f.example):''}${f.referenceDownload?'<a class="button" id="save-reference" download href="assets/examples/'+esc(data.plan.referenceFiles[document.documentElement.lang==='en'?1:0])+'">'+icon('download','small')+tx(['保存参考图','Save example picture'])+'</a>':''}${f.outputExample?outputVideoHTML(f.outputExample):''}${f.tips?`<ul class="stage-tips">${f.tips.map(tip=>`<li>${icon('check','small')}<span>${tx(tip)}</span></li>`).join('')}</ul>`:''}${f.prompt&&!f.practice?`<blockquote class="stage-prompt" id="mobile-prompt">${tx(f.promptPart||f.prompt)}</blockquote>`:''}${f.quiz?`<div class="mini-quiz"><p>${tx(['有人自称银行职员，要你的 OTP 验证码。','A caller claims to be from your bank and asks for your OTP.'])}</p><button data-mobile-answer="share">${tx(['提供验证码','Share the code'])}</button><button data-mobile-answer="check">${tx(['先挂断，再用可靠号码确认','Hang up and verify with a trusted number'])}</button><p id="quiz-feedback" role="status"></p></div>`:''}${f.note?`<p class="stage-note">${icon('shield','small')}${tx(f.note)}</p>`:''}${videoKey?videoHTML(videoKey,demo?.title):''}${!f.practice&&(f.prompt||f.open)?`<div class="stage-actions">${f.prompt?copyButton():''}${f.open?openButton():''}</div>`:''}`;}
  const relatedTitles = {
  "first": {
    "hawkers": [
      [
        "给小摊取名",
        "Name your stall"
      ],
      [
        "欢迎顾客",
        "Welcome customers"
      ],
      [
        "通知售罄",
        "Say you have sold out"
      ]
    ],
    "seniors": [
      [
        "想个活动",
        "Find an activity"
      ],
      [
        "认识本地美食",
        "Explore local food"
      ],
      [
        "约朋友喝茶",
        "Invite a friend for tea"
      ]
    ]
  },
  "voice": {
    "hawkers": [
      [
        "说说今天的优惠",
        "Describe today’s offer"
      ],
      [
        "介绍产品特色",
        "Describe your product"
      ],
      [
        "回答顾客问题",
        "Answer a customer"
      ]
    ],
    "seniors": [
      [
        "给家人发信息",
        "Message your family"
      ],
      [
        "想想煮什么",
        "Find a meal idea"
      ],
      [
        "试试翻译",
        "Try a translation"
      ]
    ]
  },
  "business-copy": [
    [
      "介绍新品",
      "Introduce a new product"
    ],
    [
      "换成马来语",
      "Try it in Malay"
    ],
    [
      "通知营业时间",
      "Update your opening hours"
    ]
  ],
  "poster": [
    [
      "新品上市",
      "Launch a product"
    ],
    [
      "节日预订",
      "Take festive orders"
    ],
    [
      "营业时间",
      "Share your opening hours"
    ]
  ],
  "video": [
    [
      "拉近镜头",
      "Move closer"
    ],
    [
      "换个角度",
      "Move across the scene"
    ],
    [
      "介绍另一款产品",
      "Feature another product"
    ]
  ],
  "social": [
    [
      "换个风格",
      "Try another style"
    ],
    [
      "写 WhatsApp 信息",
      "Write a WhatsApp message"
    ],
    [
      "安排三天内容",
      "Plan three days of posts"
    ]
  ],
  "photo": [
    [
      "看懂包装说明",
      "Read a package label"
    ],
    [
      "认识植物",
      "Identify a plant"
    ],
    [
      "翻译招牌",
      "Translate a sign"
    ]
  ],
  "greeting": [
    [
      "邀请喝茶",
      "Invite a friend for tea"
    ],
    [
      "送上生日祝福",
      "Send birthday wishes"
    ],
    [
      "祝周末愉快",
      "Wish someone a lovely weekend"
    ]
  ],
  "flow-fun": [
    [
      "让小猫挥手",
      "Make the cat wave"
    ],
    [
      "让花朵轻轻摇摆",
      "Animate some flowers"
    ],
    [
      "让云朵慢慢飘动",
      "Make the clouds drift"
    ]
  ],
  "daily": [
    [
      "准备早餐",
      "Plan breakfast"
    ],
    [
      "安排周末",
      "Plan your weekend"
    ],
    [
      "轻松出游",
      "Pack for a trip"
    ]
  ],
  "safe": [
    [
      "留意中奖信息",
      "Check a prize message"
    ],
    [
      "保护个人资料",
      "Keep personal details private"
    ],
    [
      "查证消息",
      "Verify a claim"
    ]
  ]
};
  // Two further activities per lesson, in the same reading list.
  const additionalActivities={
  "first": {
    "seniors": [
      [
        "用现有食材做菜",
        "Use what you have",
        "说出三种食材，请 ChatGPT 建议一道家常菜，再补充自己有的厨具。",
        "Name three ingredients and ask ChatGPT for a meal idea, then add which cooking equipment you have."
      ],
      [
        "聊聊兴趣",
        "Explore a hobby",
        "选一个喜欢的兴趣，请它解释一个小知识，再追问一个例子。",
        "Choose a hobby you enjoy, ask about one aspect of it, then ask for an example."
      ]
    ],
    "hawkers": [
      [
        "补齐产品资料",
        "Fill in the details",
        "请 ChatGPT 问你三个介绍产品所需的问题，再逐一补充实际资料。",
        "Ask ChatGPT for three questions that would help introduce your product, then answer with confirmed details."
      ],
      [
        "缩短介绍",
        "Shorten an introduction",
        "把自己的摊位介绍缩成两句话，再请它改得更亲切。",
        "Shorten your stall introduction to two sentences, then ask for a friendlier version."
      ]
    ]
  },
  "voice": {
    "seniors": [
      [
        "口述购物清单",
        "Dictate a shopping list",
        "说出要买的物品和数量，请它整理成清单，再核对一次。",
        "Say what you need to buy and the quantities, ask for a list and check it."
      ],
      [
        "约好见面",
        "Arrange a meeting",
        "口述一条约朋友见面的信息，发送前核对日期、时间和地点。",
        "Dictate a message arranging to meet a friend, checking the date, time and place before sending."
      ]
    ],
    "hawkers": [
      [
        "口述营业通知",
        "Dictate an opening notice",
        "说出下周实际营业日和时间，请它整理成一条顾客通知。",
        "Say next week’s confirmed opening days and hours and ask for a customer notice."
      ],
      [
        "整理订购回复",
        "Prepare an order reply",
        "用虚构产品和数量口述一条订购回复，再检查辨识出的名字和数字，不输入顾客资料。",
        "Dictate an order reply using fictional products and quantities. Check the names and numbers without entering customer details."
      ]
    ]
  },
  "business-copy": [
    [
      "想个标题",
      "Try a headline",
      "请它用已确认的产品资料写三个短标题，选出最清楚的一句。",
      "Ask for three short headlines using confirmed product details, then choose the clearest."
    ],
    [
      "说明怎样订购",
      "Explain how to order",
      "提供实际订购方式，请它整理成三个简单步骤，再检查有没有加入你没提供的要求。",
      "Give your actual ordering method and ask for three simple steps. Check that no extra requirements were invented."
    ]
  ],
  "poster": [
    [
      "外带海报",
      "Plan a takeaway poster",
      "用实际产品和包装资料，先写好一张外带海报的文字和版面要求。",
      "Use confirmed product and packaging details to draft the wording and layout for a takeaway poster."
    ],
    [
      "售罄通知",
      "Plan a sold-out notice",
      "先准备一张售罄通知的文字；要写下次营业时间时，使用已经确认的资料。",
      "Draft the wording for a sold-out notice, using confirmed details if you include your next opening time."
    ]
  ],
  "video": [
    [
      "预订提醒",
      "Give an order deadline",
      "把结尾的订购提醒换成实际预订截止日期，产品名称和价格保持正确。",
      "Change the closing message to your actual pre-order deadline, keeping the product name and price accurate."
    ],
    [
      "展示包装",
      "Show the packaging",
      "选一张产品和包装都清楚的照片，让镜头慢慢拉远，保留实际外观和数量。",
      "Choose a clear photo of the product and packaging. Request a slow zoom out while preserving their appearance and quantity."
    ]
  ],
  "social": [
    [
      "回答常见问题",
      "Answer a common question",
      "用已经确认的取货或订购资料，写一则回答顾客常见问题的帖文。",
      "Use confirmed collection or ordering details to write a post answering a common customer question."
    ],
    [
      "通知休息日",
      "Announce a closure",
      "写一则临时休息通知，核对休息日期和下次营业时间。",
      "Write a temporary closure notice and check the closure date and next opening time."
    ]
  ],
  "photo": [
    [
      "看懂使用说明",
      "Read everyday instructions",
      "拍一张日用品的使用说明，请它分成几步解释，再对照包装核对。",
      "Photograph instructions on an everyday product. Ask for a few simple steps, then check them against the packaging."
    ],
    [
      "把清单变成文字",
      "Turn a list into text",
      "拍一张不含私人资料的购物清单，请它整理成文字，再检查物品和数量。",
      "Photograph a shopping list without private details. Ask for a typed version and check the items and quantities."
    ]
  ],
  "greeting": [
    [
      "谢谢帮忙照顾花草",
      "Thank someone for plant care",
      "先准备一张感谢朋友帮忙浇花的图片提示词，写清楚感谢文字和喜欢的风格。",
      "Draft a picture prompt thanking a friend for watering your plants, including your message and preferred style."
    ],
    [
      "邀请一起吃饭",
      "Invite people for a meal",
      "先写好聚餐邀请图的文字和画面要求，核对日期、时间和地点。",
      "Draft the wording and picture idea for a meal invitation, checking the date, time and place."
    ]
  ],
  "flow-fun": [
    [
      "让小狗摇尾巴",
      "Make a dog wag its tail",
      "选一张小狗图片，只让尾巴轻轻摆动，保留原来的外貌和背景。",
      "Choose a dog picture and request a gentle tail wag, keeping its appearance and background unchanged."
    ],
    [
      "让蝴蝶动起来",
      "Animate a butterfly",
      "选一张蝴蝶图片，让翅膀轻轻开合，镜头保持不动。",
      "Choose a butterfly picture and request gently opening and closing wings with a fixed camera."
    ]
  ],
  "daily": [
    [
      "用完冰箱食材",
      "Use fridge ingredients",
      "说出冰箱里现有的食材，请它安排两顿饭，再按实际份量调整。",
      "List the ingredients in your fridge and ask for two meals, then adjust the quantities to suit you."
    ],
    [
      "准备朋友聚餐",
      "Plan a shared meal",
      "为四个人、总预算 RM80 的聚餐准备菜单和购物清单，购买前核对价格。",
      "Plan a menu and shopping list for four people within RM80, checking shop prices before buying."
    ]
  ],
  "safe": {
    "seniors": [
      [
        "核实借钱请求",
        "Check a request for money",
        "用虚构的「朋友急着借钱」信息练习，想想怎样用熟悉的号码联系本人确认。",
        "Practise with a fictional urgent request for money from a friend and decide how to verify it using a trusted number."
      ],
      [
        "留意图片来源",
        "Check a picture’s source",
        "用虚构例子，请它列出查证转发图片的方法，再自己寻找可靠来源。",
        "Use a fictional example to ask how to verify a forwarded picture, then look for reliable sources yourself."
      ]
    ],
    "hawkers": [
      [
        "核实收款变更",
        "Check changed payment details",
        "用虚构的供应商更换收款账号通知练习，讨论如何通过原有可靠渠道核实，不输入真实账号。",
        "Practise with a fictional supplier notice changing payment details. Discuss how to verify through an established trusted channel without entering real account details."
      ],
      [
        "检查宣传依据",
        "Check evidence for claims",
        "用虚构文案找出需要证据的食材、过敏原和认证说法，没有确认的内容先删掉。",
        "Review fictional copy for ingredient, allergen and certification claims that need evidence. Remove unconfirmed claims."
      ]
    ]
  },
  "avatar-setup": [
    [
      "确认使用的账号",
      "Check your account",
      "确认 Flow 登录的是自己打算使用的账号，密码和验证码由自己保管。",
      "Check that Flow is signed in to the account you intend to use, keeping your password and codes private."
    ],
    [
      "分清分身与短片",
      "Find your avatar and clips",
      "分别找到管理分身的位置和查看项目短片的位置，认识两者的用途。",
      "Find where to manage your avatar and where to view project videos, and explore what each is for."
    ]
  ],
  "avatar-video": {
    "seniors": [
      [
        "送上生日祝福",
        "Send birthday wishes",
        "先准备一句简短生日祝福，用自己的分身说给亲友听，动作保持简单。",
        "Draft a short birthday greeting for your avatar to say to family or friends, keeping the gesture simple."
      ],
      [
        "邀请家人吃饭",
        "Invite family for a meal",
        "先准备一句聚餐邀请，核对时间和地点，再用简单背景制作短片。",
        "Draft a meal invitation, check the time and place, then use a simple background for the clip."
      ]
    ],
    "hawkers": [
      [
        "感谢顾客支持",
        "Thank your customers",
        "准备一句感谢支持的口播，不放入顾客姓名、电话或订单资料。",
        "Prepare a short thank-you message without customer names, phone numbers or order details."
      ],
      [
        "通知产品售罄",
        "Announce a sold-out product",
        "准备一句售罄通知；提到下次营业或预订时间时，使用实际资料。",
        "Prepare a short sold-out notice, using confirmed details for your next opening or pre-order time."
      ]
    ]
  }
};
  function endingActivities(){const labels=item.activities?item.activities.map(a=>a.title):relatedTitles[item.id],headings=Array.isArray(labels)?labels:labels[data.audience];const extra=additionalActivities[item.id],rows=Array.isArray(extra)?extra:extra[data.audience];return activityIdeas().map((body,i)=>({title:headings[i],body})).concat(rows.map(([zh,en,bzh,ben])=>({title:[zh,en],body:[bzh,ben]})));}
  const atEnd=()=>active===frames.length;
  const positionLabel=()=>atEnd()?tx(['本课结束','End of lesson']):tx(['步骤 ','Step '])+(active+1)+' / '+frames.length;
  const forwardState=()=>atEnd()?{label:['本课结束','Lesson end'],icon:'book',cls:'',disabled:true}:active===frames.length-1?{label:['看看还能做什么','More things to try'],icon:'book',cls:'review-lesson',disabled:false}:{label:['下一步','Next'],icon:'arrow',cls:'primary',disabled:false};
  function boundaryHTML(){const next=data.lessons[data.lessons.indexOf(item)+1];return '<div class="lesson-boundary"><h2 id="frame-heading" tabindex="-1">'+tx(['还可以这样试试','Five more things to try'])+'</h2><ul class="similar-activities">'+endingActivities().map(a=>'<li><h3>'+tx(a.title)+'</h3><p>'+tx(a.body)+'</p></li>').join('')+'</ul>'+(next?'<a class="button start-next-lesson" href="#lesson/'+esc(next.id)+'"><span>'+tx(['开始下一课','Start next lesson'])+'<strong>'+tx(next.title)+'</strong></span>'+icon('arrow')+'</a>':'')+'<a class="button boundary-contents" href="#contents">'+tx(['返回学习内容','Back to contents'])+'</a></div>';}
  const stageHTML=()=>atEnd()?boundaryHTML():frameHTML(frames[active]);
  function render(id){item=data.lessons.find(l=>l.id===id);if(!item)return `<main id="main"><h1>${tx(['没有找到这页内容','This page could not be found'])}</h1><a href="#contents">${tx(['学习内容','Contents'])}</a></main>`;frames=framesFor(item);active=0;
    return `<main id="main" class="mobile-workbook" tabindex="-1"><header class="mobile-lesson-heading"><h1>${tx(item.title)}</h1><div class="mobile-progress"><span id="mobile-count">${positionLabel()}</span><button type="button" id="lesson-overview">${icon('list','small')}${tx(['全部步骤','All steps'])}</button></div></header><section id="lesson-stage" class="lesson-stage" aria-labelledby="frame-heading">${stageHTML()}</section><div class="mobile-controls"><button id="mobile-back" ${active===0?'disabled':''}>${icon('back','small')}${tx(['上一步','Back'])}</button><button id="mobile-next" class="${forwardState().cls}" ${forwardState().disabled?'disabled':''}>${tx(forwardState().label)}${icon(forwardState().icon,'small')}</button></div></main><dialog id="mobile-dialog" aria-labelledby="mobile-dialog-title"><header><h2 id="mobile-dialog-title"></h2><button type="button" id="close-mobile-dialog">${tx(['关闭','Close'])}${icon('close','small')}</button></header><div id="mobile-dialog-content"></div></dialog>`;
  }
  function bind(){if(!item)return;const dialog=$('#mobile-dialog');const close=()=>dialog.close();$('#close-mobile-dialog').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close()});
    const show=(n,focus=true)=>{active=n;$('#lesson-stage').innerHTML=stageHTML();$('#lesson-stage').scrollTop=0;$('#mobile-count').textContent=atEnd()?t(['本课结束','End of lesson']):t(['步骤 ','Step '])+(n+1)+' / '+frames.length;$('#mobile-back').disabled=n===0;const forward=forwardState();$('#mobile-next').className=forward.cls;$('#mobile-next').disabled=forward.disabled;$('#mobile-next').innerHTML=tx(forward.label)+icon(forward.icon,'small');bindFrame();window.rewriteCourseLinks?.();if(focus)$('#frame-heading').focus({preventScroll:true});};
    $('#mobile-back').addEventListener('click',()=>show(Math.max(0,active-1)));$('#mobile-next').addEventListener('click',()=>{if(active<frames.length)show(active+1);});
    $('#lesson-overview').addEventListener('click',()=>{$('#mobile-dialog-title').textContent=t(['全部步骤','All steps']);$('#mobile-dialog-content').innerHTML=`<ol class="overview-list">${frames.map((f,i)=>`<li ${i===active?'aria-current="step"':''}>${tx(f.title)}</li>`).join('')}</ol>`;dialog.showModal();});
    function bindFrame(){if(atEnd())return;const f=frames[active];$('#mobile-copy')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(t(f.prompt));$('#mobile-copy span').textContent=t(['已复制','Copied']);announce(t(f.copyDestination==='notes'?['文字已复制，可粘贴到手机备忘录，稍后使用。','Text copied. Paste it into your phone notes for later.']:isFlow()?['文字已复制。到 Flow 长按输入框，再选择粘贴。','Text copied. In Flow, press and hold the prompt box, then choose Paste.']:['文字已复制。到 ChatGPT 长按输入框，再选择粘贴。','Text copied. In ChatGPT, press and hold the message box, then choose Paste.']));}catch{let p=$('#mobile-prompt');if(!p){p=document.createElement('p');p.id='mobile-prompt';p.textContent=t(f.prompt);$('#lesson-stage').append(p);}p.textContent=t(f.prompt);const r=document.createRange();r.selectNodeContents(p);const s=getSelection();s.removeAllRanges();s.addRange(r);announce(t(['长按已选文字，再按复制。','Press and hold the selected text, then choose Copy.']));}});
      document.querySelectorAll('[data-mobile-answer]').forEach(b=>b.addEventListener('click',()=>{$('#quiz-feedback').textContent=t(b.dataset.mobileAnswer==='check'?['这样能保护账号：先挂断，再用自己保存的官方号码确认。验证码请自己保管。','To protect your account, hang up and check using an official number you already trust. Keep your code private.']:['为保护账号，请保留验证码，先挂断，再用可靠号码确认。','Keep the code private, hang up and check using a trusted number.']);}));
    }bindFrame();
  }
  return {render,bind};
};
