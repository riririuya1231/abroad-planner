// 北极星名校计划增强模块：长期高端路径规划 / 执行确定性导向
(function(){
  const POLARIS_PRODUCTS = [
    {
      name:'北极星名校计划',
      code:'ZHB-132394',
      cat:'高端长期规划',
      country:'英美港新澳加/多地联申',
      stage:'本科/硕士',
      price:'98000/可优惠3000',
      tags:['QS前100','长期规划','执行确定性','路径管理','科研实习二选一'],
      desc:'12所院校/2个专业，适合国内外本科在读生或毕业生；由经验丰富申请老师进行长期路径规划、定校、文书、申请与背景提升协同，项目周期约12个月。'
    },
    {
      name:'牛剑启明计划',
      code:'ZHB-132395',
      cat:'顶尖名校长期规划',
      country:'英国',
      stage:'本科/硕士',
      price:'258000/可优惠3000',
      tags:['牛津大学','剑桥大学','顶尖名校','长期规划','学术路径'],
      desc:'目标牛津大学/剑桥大学，5所院校/2个专业；适合目标明确、愿意接受12个月以上系统培养的学生，重在学术能力、科研/实习、语言标化与申请材料长期建设。'
    },
    {
      name:'藤校领袖计划',
      code:'ZHB-132392',
      cat:'顶尖名校长期规划',
      country:'美国',
      stage:'本科/硕士',
      price:'388000/可优惠5000',
      tags:['藤校','美国Top30','哈耶普麻哥','成长叙事','影响力导向'],
      desc:'目标哈佛、耶鲁、普林斯顿、麻省理工、哥伦比亚等美国顶尖院校，15所院校/2个专业；强调长期成长叙事、个人影响力、学术与活动体系搭建，项目周期12-36个月。'
    }
  ];

  const POLARIS_FAQ = {
    '北极星定位':'北极星不是普通科研产品，也不是简单申请套餐，而是以培养路径为核心的长期高端项目。它解决的是学生目标高、时间线长、任务复杂、申请不确定性大的问题。',
    '为什么适合高端名校学生':'顶尖院校看的是长期能力轨迹，不只看临近申请季的包装。北极星会把GPA、语言标化、科研/实习、专业探索、文书素材、推荐信和申请节奏拆成阶段目标，降低申请过程失控风险。',
    '和普通科研/实习的区别':'普通科研或实习更像单点经历，北极星更像项目管理和长期培养。它会判断学生到底需要科研、实习、语言、GPA、竞赛还是文书主线，而不是为了堆背景而堆背景。',
    '能不能保证录取':'不能承诺保录取、稳录取、包过或一定发表。我们能承诺的是路径是否合理、任务是否可执行、材料是否完整、能力是否被真实提升，以及申请过程是否更可控。',
    '为什么周期长':'顶尖大学筛选的是长期投入能力。1-3年不是拖时间，而是给学生留下成绩、语言、研究、实习、作品、活动和文书素材自然沉淀的空间。周期可以评估压缩，但必须说明压缩后的风险和代价。',
    '为什么不提前给导师姓名':'报名前不直接给导师姓名，是出于师资隐私和管理规范。正式报名后会进行匹配和对接，全程真实教学，推荐信和沟通渠道可验证。'
  };

  function ready(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn);
    else fn();
  }
  function safe(s){return String(s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function uniqProducts(arr){
    const seen=new Set();
    return arr.filter(p=>p && !seen.has(p.name) && seen.add(p.name));
  }
  function getD(){
    try{return typeof data==='function'?data():{};}catch(e){return {};}
  }
  function polarisScore(d){
    const text=[d.country,d.stage,d.ranking,d.major,d.score,d.languageScore,(d.targetSchools||''),(d.backgrounds||[]).join(' '),(d.weaknesses||[]).join(' '),(d.concerns||[]).join(' '),document.getElementById('extraInfo')?.value||''].join(' ');
    let score=0, reasons=[];
    if(/牛剑|Oxford|Cambridge|G5|QS前50|QS前100|藤校|Top30|Top50|哈佛|耶鲁|普林斯顿|麻省理工|哥伦比亚|港前三|新二|顶尖|名校|高端/.test(text)){score+=35;reasons.push('目标院校层级较高，需要长期路径规划');}
    if(/大一|大二|G9|G10|G11|高一|高二|12个月|一年|长期|提前/.test(text)){score+=25;reasons.push('准备周期较长，适合做阶段化任务拆解');}
    if(/科研|实习|竞赛|论文|夏校|背景|活动|作品集|文书主线|影响力|成长/.test(text)){score+=20;reasons.push('涉及背景建设，需要判断哪些经历真正有权重');}
    if(/不确定|目标不清晰|专业方向不明确|路径|规划|风险|家长焦虑/.test(text)){score+=15;reasons.push('存在方向或执行不确定性，需要顾问持续跟进');}
    if(/20万以上|10-20万|预算充足|高净值/.test(text)){score+=10;reasons.push('预算可支持高端长期项目');}
    return {score,reasons};
  }
  function choosePolaris(d){
    const t=[d.country,d.ranking,d.targetSchools,document.getElementById('extraInfo')?.value||''].join(' ');
    if(/牛剑|Oxford|Cambridge|英国|G5/.test(t)) return POLARIS_PRODUCTS.find(p=>p.name==='牛剑启明计划');
    if(/藤校|美国|Top30|哈佛|耶鲁|普林斯顿|麻省理工|哥伦比亚|MIT|Harvard|Yale|Princeton|Columbia/.test(t)) return POLARIS_PRODUCTS.find(p=>p.name==='藤校领袖计划');
    return POLARIS_PRODUCTS.find(p=>p.name==='北极星名校计划');
  }
  function addProducts(){
    if(typeof products==='undefined') return;
    POLARIS_PRODUCTS.forEach(p=>{
      if(!products.some(x=>x.name===p.name || x.code===p.code)) products.push(p);
    });
    if(typeof renderLibrary==='function') renderLibrary();
  }

  const oldPick = typeof pickProducts==='function' ? pickProducts : null;
  window.pickProducts = pickProducts = function(d){
    let arr = oldPick ? oldPick(d) : [];
    const s=polarisScore(d);
    if(s.score>=35){
      const chosen=choosePolaris(d);
      arr=[chosen,...arr];
      if(s.score>=55){
        const base=POLARIS_PRODUCTS.find(p=>p.name==='北极星名校计划');
        if(chosen.name!==base.name) arr.splice(1,0,base);
      }
    }
    return uniqProducts(arr).slice(0,10);
  };

  const oldSchoolReason = typeof schoolReason==='function' ? schoolReason : null;
  window.schoolReason = schoolReason = function(d,tier){
    const r = oldSchoolReason ? oldSchoolReason(d,tier) : {why:'',cond:[],watch:[],improve:[]};
    const s=polarisScore(d);
    if(s.score>=35){
      r.improve = [...(r.improve||[]),'用北极星路径拆解长期任务：GPA/语言/科研或实习/文书素材/推荐信/申请节点'];
      r.watch = [...(r.watch||[]),'避免把科研或实习做成结果包装，必须能说明真实参与、方法、贡献和产出'];
      if(tier==='high') r.why += ' 若目标是顶尖名校，高冲院校更看重长期成长轨迹和材料可信度，建议用北极星做路径管理。';
    }
    return r;
  };

  function polarisPanel(){
    const d=getD();
    const s=polarisScore(d);
    const chosen=choosePolaris(d);
    const reasons=s.reasons.length?s.reasons:['当前信息暂未强触发北极星，但如家长目标高、时间线长、预算充足，可作为高端长期规划备选。'];
    const level=s.score>=55?'强推荐':s.score>=35?'可推荐':'暂不主推';
    return `<div class="section-card"><h3>北极星名校计划匹配判断</h3>
      <div class="summary-grid">
        <div class="mini-card"><b>推荐等级</b><p>${level}｜匹配分 ${s.score}/100</p></div>
        <div class="mini-card"><b>优先推荐产品</b><p>${chosen.name}<br>${chosen.code}｜${chosen.price}</p></div>
        <div class="mini-card"><b>定位</b><p>路径规划 / 执行确定性 / 长期高端培养</p></div>
      </div>
      <h4>为什么适合/不适合</h4><ul class="list">${reasons.map(x=>`<li>${x}</li>`).join('')}</ul>
      <h4>适配条件</h4><ul class="list">
        <li>目标院校较高：QS前100、英国G5/牛剑、美国Top30/藤校、港前三/新二/澳八大前列等。</li>
        <li>时间线较长：最好12个月以上，若压缩到一年内，需要明确风险和取舍。</li>
        <li>需要系统任务管理：成绩、语言、科研/实习、竞赛、文书主线、推荐信和申请节奏都要被追踪。</li>
        <li>家庭接受高端长期投入，而不是只想临近申请季低价递交。</li>
      </ul>
      <h4>需要注意</h4><ul class="list">
        <li>不能承诺保录、稳录、包过、保证发表或保证进名校。</li>
        <li>不能把科研/实习说成万能加分，要看相关性、参与度、产出和证明。</li>
        <li>顾问应表达“降低不确定性、提高路径清晰度和材料完成度”，不要表达“买了就放心”。</li>
      </ul>
      <h4>可直接发家长的话术</h4>
      <pre id="polarisTalk">${safe(`家长，北极星名校计划不是单纯帮孩子堆科研或做一个申请套餐，而是把孩子冲刺名校这件事拆成一条可执行的长期路径。像这类目标比较高的学生，真正的风险往往不是能力不够，而是时间线混乱、材料分散、经历和专业方向解释不清。北极星会把GPA、语言、科研/实习、文书素材、推荐信和申请节点拆成阶段目标，每一步都有明确标准，帮助孩子把申请不确定性降下来。我们不会承诺保录取，但会把路径是否合理、任务是否完成、材料是否经得起追问这几件事做扎实。`)}</pre>
      <button onclick="copyText(document.getElementById('polarisTalk').innerText)">复制北极星话术</button>
    </div>`;
  }
  function polarisFaqPanel(){
    return `<div class="section-card"><h3>北极星Q&A话术库</h3><div class="faq-grid">${Object.entries(POLARIS_FAQ).map(([k,v])=>`<div class="mini-card"><button onclick="copyText('${v.replace(/'/g,"\\'")}')">复制</button><h4>${k}</h4><p>${v}</p></div>`).join('')}</div></div>`;
  }

  const oldGenerate = window.generate;
  window.generate = function(){
    if(typeof oldGenerate==='function') oldGenerate();
    const out=document.getElementById('output');
    if(out && !document.getElementById('polarisTalk')){
      out.insertAdjacentHTML('beforeend',polarisPanel()+polarisFaqPanel());
    }
  };

  ready(()=>{
    addProducts();
    const gen=document.getElementById('generateBtn'); if(gen) gen.onclick=window.generate;
    const school=document.getElementById('schoolPlanBtn'); if(school) school.onclick=window.generate;
    const style=document.createElement('style');
    style.textContent='.section-card h4{margin:14px 0 8px}.school-card h4 span{font-weight:500;color:#526070}.timeline div b{min-width:34px}.mini-card pre,.section-card pre{white-space:pre-wrap;background:#f7f4ff;border-radius:12px;padding:12px;line-height:1.65}';
    document.head.appendChild(style);
  });
})();
