function textOf(id){return (document.getElementById(id)?.value||'').trim()}
const vShort=s=>String(s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const ztFaq={
'紫藤留学定位':'紫藤留学是高顿旗下留学服务品牌，早期更多服务高顿内部财经、证书和升学类学员，近几年独立品牌化运营。核心不是单纯递交申请，而是把留学申请、语言培训、背景提升、职业规划和行前服务做成一体化规划。',
'平台与资源优势':'高顿集团成立时间早，财经教育背景强，商科/财经/职业资源是优势；紫藤留学覆盖英联邦、北美、欧洲、亚洲等多地区申请，并可衔接语言、科研、实习、竞赛、GPA、RP、作品集等资源。',
'师资与服务优势':'规划导师、文书老师、学管和背景提升导师协同服务。重点不是只给院校清单，而是从学生背景、目标专业、就业方向、申请时间线和材料质量出发，做冲稳保方案、文书主线和后续跟进。',
'文书服务怎么说':'文书不是简单润色，也不是AI套模板。我们会先挖学生经历、专业动机、职业规划和项目匹配，再做结构化表达和多轮修改。文书质量重点看真实性、逻辑、差异化和项目匹配度。',
'是否能保证录取':'申请结果受学生背景、当年竞争、学校政策、项目要求和材料质量影响，不能做不负责任的绝对承诺。我们能做的是通过合理定校、冲稳保组合、文书质量、节点把控和补强方案，提高录取确定性。',
'规划师离职怎么办':'服务不是依赖单个老师，签约后有专属服务群，规划、学管、文书协作推进；如遇人员变动，会按SOP交接材料、进度和学生情况，确保服务不断档。',
'案例为什么不完全公开':'留学案例涉及学生隐私，不能把完整个人信息公开展示。可展示的是脱敏案例、录取方向、项目类型和申请策略逻辑；同背景学生也要结合GPA、语言、专业、经历重新判断。',
'文书是否能多次修改':'可以修改，但不是无意义反复改。每次修改都围绕项目要求、学生素材、逻辑表达和专业匹配进行。若涉及重大方向变化，需要重新梳理素材和版本。',
'拒录/waitlist怎么办':'拒录或waitlist后要看具体原因。可补充新成绩、新经历、argue信或更新材料；同时要准备补申和保底方案，避免只等一个结果。',
'面试服务怎么讲':'面试辅导包括面试形式解析、项目理解、常见问题、经历表达、模拟面试和复盘。港校、英校、商科和高端项目尤其需要提前训练表达。',
'为什么要早规划':'留学申请不是递交前才开始。真正影响结果的是GPA、语言、实习、科研、竞赛、推荐信和文书素材。越早规划，可补短板越多；越晚启动，只能被动包装现有背景。',
'考研留学双线':'考研和留学不冲突，可以两手准备。留学申请一般大四上递交，考研12月，如果前期规划好，语言、GPA、科研、实习和文书材料可以同步推进，最后根据录取和考研结果选择。',
'出国读研优势':'海外院校选择多、学制相对短、国际化资源和就业路径更丰富；对未来进外企、投行、互联网、四大等方向有帮助。但前提是学校、专业、预算和职业目标匹配。',
'不知道去哪个国家':'可以先从预算、学制、排名、就业、移民、专业适配和家长接受度拆。美国/英国排名和资源强，港新离家近且就业友好，澳加相对稳定，欧洲/日韩/马来西亚预算更友好。'
};
const IELTS_GUIDE='雅思目标可参考：5.5适合部分日韩/预科/直通项目；6.0-6.5适合港澳新澳一般项目；6.5-7.0适合英国/加拿大/澳洲较好学校；7.0-7.5+适合G5、美国高竞争项目和部分商科/传媒/教育项目。最终以官网小分要求为准。';

function analyzeExtraInfo(){
  const extra=textOf('extraInfo');
  const reply=textOf('clientReply');
  const combined=(extra+' '+reply).toLowerCase();
  const advantages=[], cautions=[], upgrades=[], weight=[];
  if(!extra) cautions.push('暂未填写补充信息，当前主要根据勾选项和基础字段生成，建议补学校、成绩、语言、经历和目标院校。');
  if(/实习|intern|公司|事务所|证券|银行|咨询|四大|八大|jp|morgan|citi|花旗/.test(combined)){advantages.push('已有实习/职业相关经历，可作为文书职业主线和就业导向证明。');weight.push('实习权重：对商科、金融、管理、商业分析、就业导向专业较高；需要明确岗位、时长、职责、成果和证明。');}
  if(/科研|论文|课题|实验室|research|paper|publication|rp|教授/.test(combined)){advantages.push('已有科研/论文/课题信息，对研究型硕士、博士、理工/生化/社科方向有加分价值。');weight.push('科研权重：对研究型硕士、博士、理工、生化、社科项目较高；需明确题目、方法、产出、导师和推荐信可能。');}
  if(/竞赛|amc|nec|物理碗|bpho|ukcho|bbo|usaco|john locke|奖/.test(combined)){advantages.push('已有竞赛/奖项线索，可用于体现学术潜力和专业兴趣。');weight.push('竞赛权重：低龄本科申请和高竞争专业更有价值；硕士申请中要看竞赛级别和专业相关性。');}
  if(/夏校|下校|访校|camp|summer|研学|港大|剑桥|nus|ntu/.test(combined)){advantages.push('有夏校/下校/访校经历，可作为专业探索和院校兴趣证明。');cautions.push('夏校/访校通常权重低于正式科研、实习、竞赛和成绩，需看项目含金量、时长、产出和证明。');weight.push('夏校/访校权重：适合作为兴趣和探索补充，不能单独支撑高冲院校。');}
  if(/双非|独立学院|民办|三本/.test(combined)){cautions.push('本科院校背景可能涉及院校list/认可名单限制，英港澳部分项目必须优先核查China list和均分门槛。');upgrades.push('定校时增加匹配和保底层，并用实习/科研/语言补强。');}
  if(/985|211|双一流|海本|海外本科/.test(combined)){advantages.push('院校背景相对有利，可保留冲刺层，但仍需看GPA、专业匹配和语言。');}
  if(/跨专业|转专业/.test(combined)){cautions.push('存在跨专业风险，需要核查先修课、课程描述、相关经历和文书逻辑。');upgrades.push('建议补专业相关项目/实习/课程，降低跨专业解释成本。');}
  if(/雅思\s*[0-5]\.?\d?|托福\s*[0-7]\d|未考|语言.*低/.test(combined)){cautions.push('语言目前偏风险，需同步规划雅思/托福出分和小分。');upgrades.push('优先补语言总分与小分，避免申请后conditional压力。');}
  if(/均分\s*[0-7]\d|gpa\s*2\.|成绩.*低|挂科/.test(combined)){cautions.push('成绩/GPA存在风险，定校需要增加匹配和保底比例。');upgrades.push('建议搭配GPA/海外课程学术辅导，提升成绩解释和后续表现。');}
  if(/港前三|g5|牛剑|藤校|top\s*30|qs\s*50/.test(combined)){cautions.push('目标较高，需用高质量背景、文书和精准定校支撑，不建议只押高冲。');}
  if(!advantages.length) advantages.push('补充信息暂未识别到明确强优势，可继续补充具体学校、成绩、活动名称、时间、产出。');
  if(!cautions.length) cautions.push('仍需核查官网项目要求、截止日期、语言小分、均分门槛和院校名单。');
  if(!upgrades.length) upgrades.push('建议围绕目标专业补充实习/科研/竞赛/文书素材，并完善成绩单、CV和证明材料。');
  return {extra,reply,advantages,cautions,upgrades,weight};
}

function extraPanel(){
  const a=analyzeExtraInfo();
  return `<div class="section-card"><h3>补充信息智能批注</h3><p><b>原始补充：</b>${vShort(a.extra)||'未填写'}</p><div class="summary-grid"><div class="mini-card"><b>可作为优势</b><ul class="list">${a.advantages.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="mini-card"><b>需要注意</b><ul class="list">${a.cautions.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="mini-card"><b>建议提升</b><ul class="list">${a.upgrades.map(x=>`<li>${x}</li>`).join('')}</ul></div></div><h4>经历权重判断</h4><ul class="list">${(a.weight.length?a.weight:['暂无可判断经历权重，建议继续补充具体经历名称、时长、产出和证明。']).map(x=>`<li>${x}</li>`).join('')}</ul><p class="warning">这部分会把自由输入纳入方案判断；涉及院校要求仍需点查校链接核查官网。</p></div>`;
}

function timelineAdvice(){
  const intake=textOf('intake')||'目标入学季未定';
  return `<div class="section-card"><h3>申请时间轴补充</h3><div class="timeline"><div><b>现在</b><span>确认国家、专业、预算、院校层级；收集成绩单、语言、简历和经历证明。</span></div><div><b>1-2周</b><span>核查官网要求、院校名单/认可名单、语言小分、先修课和DDL。</span></div><div><b>2-6周</b><span>确定冲稳保清单；启动PS/CV/推荐信/RP/作品集；同步补语言或背景提升。</span></div><div><b>申请开放后</b><span>分批递交；跟进补件、面试、waitlist/argue和补申。</span></div><div><b>录取后</b><span>押金、签证、住宿、行前、接机及入学后GPA/课业支持。</span></div></div><p class="warning">目标入学：${vShort(intake)}。如果距离入学不足12个月，建议申请、语言和背景补强同步推进。</p></div>`;
}

function faqPanel(){
  return `<div class="section-card"><h3>紫藤留学&服务FAQ话术</h3><div class="faq-grid">${Object.entries(ztFaq).map(([k,v])=>`<div class="mini-card"><button onclick="copyText('${v.replace(/'/g,"\\'")}')">复制</button><h4>${k}</h4><p>${v}</p></div>`).join('')}</div><div class="mini-card"><h4>雅思/语言联动提醒</h4><p>${IELTS_GUIDE}</p></div></div>`;
}

function followupText(){
  const d=typeof data==='function'?data():{};
  const a=analyzeExtraInfo();
  const r=a.reply||'客户暂无新回复';
  let angle='先确认核心顾虑，再推进一次短沟通或补资料。';
  if(/贵|价格|预算|便宜|费用/.test(r)) angle='重点解释不是单买申请，而是定校、文书、网申、时间线、风险控制和后续服务的组合价值。';
  if(/比较|看看|其他机构|再问问/.test(r)) angle='建议让家长把其他方案的申请数量、地区、文书、导师、背提和售后逐项对比。';
  if(/不急|暑假|之后|晚点/.test(r)) angle='强调申请规划和背景提升有时间窗口，尤其语言、GPA、科研/实习不能等申请季再补。';
  if(/港前三|g5|牛剑|名校|排名/.test(r)) angle='先认可目标，再提醒高目标需要冲稳保和背景补强，不能只押高冲。';
  if(/背景提升|科研|实习|竞赛|有没有用|权重/.test(r)) angle='解释背提不是万能加分，而是服务于专业匹配、文书证据和面试表达，权重取决于项目质量、产出和关联度。';
  if(/保证|保录|一定录|失败/.test(r)) angle='不要承诺绝对录取，要解释风险控制和冲稳保策略。';
  return `客户最新回复：${r}\n\n判断：${angle}\n\n建议回复：\n家长，我理解您的顾虑。结合孩子目前的目标和现有信息，我建议咱们先不要只看单一学校或单一价格，而是把方案拆成三块：第一是冲稳保院校是否合理，第二是现有成绩/语言/背景能不能支撑目标，第三是哪些短板必须现在补。${a.advantages[0]||''} 但同时也要注意：${a.cautions[0]||''} 所以我建议下一步先把成绩单、语言、已有经历和目标院校发我，我给您做一版更清楚的冲稳保和产品组合对比，您再判断是否推进。`;
}

const oldGenerate=window.generate;
window.generate=function(){
  if(typeof oldGenerate==='function') oldGenerate();
  const out=document.getElementById('output');
  if(out){
    const follow=`<div class="section-card"><h3>下一步跟进话术</h3><pre id="followupTalk">${followupText()}</pre><button onclick="copyText(document.getElementById('followupTalk').innerText)">复制下一步话术</button></div>`;
    out.insertAdjacentHTML('beforeend',extraPanel()+timelineAdvice()+faqPanel()+follow);
  }
};
function generateFollowupOnly(){
  const out=document.getElementById('output');
  if(out && out.classList.contains('output-empty')){window.generate();return;}
  const box=document.getElementById('followupTalk');
  if(box){box.innerText=followupText(); if(typeof toast==='function')toast('已更新下一步话术');}
  else if(out){out.insertAdjacentHTML('beforeend',`<div class="section-card"><h3>下一步跟进话术</h3><pre id="followupTalk">${followupText()}</pre><button onclick="copyText(document.getElementById('followupTalk').innerText)">复制下一步话术</button></div>`)}
}

setTimeout(()=>{
  const btn=document.getElementById('followupBtn'); if(btn)btn.onclick=generateFollowupOnly;
  const gen=document.getElementById('generateBtn'); if(gen)gen.onclick=window.generate;
  const school=document.getElementById('schoolPlanBtn'); if(school)school.onclick=window.generate;
  const style=document.createElement('style');
  style.textContent='.faq-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}.faq-grid .mini-card button{float:right}.list li{margin-bottom:6px}';
  document.head.appendChild(style);
},0);
