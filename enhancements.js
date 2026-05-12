function textOf(id){return (document.getElementById(id)?.value||'').trim()}
function analyzeExtraInfo(){
  const extra=textOf('extraInfo');
  const reply=textOf('clientReply');
  const combined=(extra+' '+reply).toLowerCase();
  const notes=[];
  const advantages=[];
  const cautions=[];
  const upgrades=[];
  const keywords=[];
  if(!extra){notes.push('暂未填写补充信息，当前主要根据勾选项和基础字段生成。');}
  if(/实习|intern|公司|事务所|证券|银行|咨询|四大|八大/.test(combined)){advantages.push('已有实习/职业相关经历，可作为文书职业主线和就业导向证明。');keywords.push('internship career experience');}
  if(/科研|论文|课题|实验室|research|paper|publication|rp/.test(combined)){advantages.push('已有科研/论文/课题信息，对研究型硕士、博士、理工/生化方向有加分价值。');keywords.push('research publication project');}
  if(/竞赛|amc|nec|物理碗|bpho|ukcho|bbo|usaco|john locke|奖/.test(combined)){advantages.push('已有竞赛/奖项线索，可用于体现学术潜力和专业兴趣。');keywords.push('competition award');}
  if(/夏校|下校|访校|camp|summer|研学|港大|剑桥|nus|ntu/.test(combined)){advantages.push('有夏校/下校/访校经历，可作为专业探索和院校兴趣证明，但权重通常低于正式科研、实习、竞赛和成绩。');cautions.push('夏校/访校经历需要看项目含金量、时长、产出物和是否有证明/推荐信，不能单独支撑高冲院校。');keywords.push('summer school campus visit');}
  if(/双非|独立学院|民办|三本/.test(combined)){cautions.push('本科院校背景可能涉及院校list/认可名单限制，英港澳部分项目必须优先核查China list和均分门槛。');}
  if(/985|211|双一流|海本|海外本科/.test(combined)){advantages.push('院校背景相对更有利，可适度保留冲刺层，但仍需看GPA、专业匹配和语言。');}
  if(/跨专业|转专业/.test(combined)){cautions.push('存在跨专业风险，需要核查先修课、课程描述、相关经历和文书逻辑。');upgrades.push('建议补专业相关项目/实习/课程，降低跨专业解释成本。');}
  if(/雅思\s*[0-5]\.?\d?|托福\s*[0-7]\d|未考|语言.*低/.test(combined)){cautions.push('语言目前偏风险，需同步规划雅思/托福出分和小分。');upgrades.push('优先补语言总分与小分，避免申请后conditional压力。');}
  if(/均分\s*[0-7]\d|gpa\s*2\.|成绩.*低|挂科/.test(combined)){cautions.push('成绩/GPA存在风险，定校需要增加匹配和保底比例。');upgrades.push('建议搭配GPA/海外课程学术辅导，提升成绩解释和后续表现。');}
  if(/港前三|g5|牛剑|藤校|top\s*30|qs\s*50/.test(combined)){cautions.push('目标较高，需用高质量背景、文书和精准定校支撑，不建议只押高冲。');}
  if(!advantages.length)advantages.push('补充信息暂未识别到明确强优势，可继续补充具体学校、成绩、活动名称、时间、产出。');
  if(!cautions.length)cautions.push('仍需核查官网项目要求、截止日期、语言小分、均分门槛和院校名单。');
  if(!upgrades.length)upgrades.push('建议围绕目标专业补充实习/科研/竞赛/文书素材，并完善成绩单、CV和证明材料。');
  return {extra,reply,advantages,cautions,upgrades,keywords};
}
function extraPanel(){
  const a=analyzeExtraInfo();
  return `<div class="section-card"><h3>补充信息智能批注</h3><p><b>原始补充：</b>${a.extra||'未填写'}</p><div class="summary-grid"><div class="mini-card"><b>可作为优势</b><ul class="list">${a.advantages.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="mini-card"><b>需要注意</b><ul class="list">${a.cautions.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="mini-card"><b>建议提升</b><ul class="list">${a.upgrades.map(x=>`<li>${x}</li>`).join('')}</ul></div></div><p class="warning">这部分会把自由输入内容纳入方案判断；涉及院校要求仍需点查校链接核查官网。</p></div>`;
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
  return `客户最新回复：${r}\n\n判断：${angle}\n\n建议回复：\n家长，我理解您的顾虑。结合孩子目前的目标和现有信息，我建议咱们先不要只看单一学校或单一价格，而是把方案拆成三块：第一是冲稳保院校是否合理，第二是现有成绩/语言/背景能不能支撑目标，第三是哪些短板必须现在补。${a.advantages[0]||''} 但同时也要注意：${a.cautions[0]||''} 所以我建议下一步先把成绩单、语言、已有经历和目标院校发我，我给您做一版更清楚的冲稳保和产品组合对比，您再判断是否推进。`;
}
const oldGenerate=window.generate;
window.generate=function(){
  oldGenerate();
  const out=document.getElementById('output');
  if(out){
    const panel=extraPanel();
    const follow=`<div class="section-card"><h3>下一步跟进话术</h3><pre id="followupTalk">${followupText()}</pre><button onclick="copyText(document.getElementById('followupTalk').innerText)">复制下一步话术</button></div>`;
    out.insertAdjacentHTML('beforeend',panel+follow);
  }
};
function generateFollowupOnly(){
  const out=document.getElementById('output');
  if(out && out.classList.contains('output-empty')){window.generate();return;}
  const box=document.getElementById('followupTalk');
  if(box){box.innerText=followupText();toast('已更新下一步话术');}
  else if(out){out.insertAdjacentHTML('beforeend',`<div class="section-card"><h3>下一步跟进话术</h3><pre id="followupTalk">${followupText()}</pre><button onclick="copyText(document.getElementById('followupTalk').innerText)">复制下一步话术</button></div>`)}
}
setTimeout(()=>{
  const btn=document.getElementById('followupBtn');
  if(btn)btn.onclick=generateFollowupOnly;
  const gen=document.getElementById('generateBtn');
  const school=document.getElementById('schoolPlanBtn');
  if(gen)gen.onclick=window.generate;
  if(school)school.onclick=window.generate;
},0);
