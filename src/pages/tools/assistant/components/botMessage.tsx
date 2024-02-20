import { RobotOutlined } from "@ant-design/icons";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useDispatch } from "react-redux";
import {
  thinkingNormalBotMessageDone,
  typingNormalBotMessageDone,
} from "../redux/msglistSlice";
import { InnerProps } from "./message";
import { triggerScrollbottomSign } from "../redux/scrollbottomSlice";

export function generateFixBotAnswer() {
  // https://www.daodejing.org/
  const theTaoteChing: string[] = [
    "【第一章】道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼（jiào）。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。",
    "【第二章】天下皆知美之为美，斯恶（è）已；皆知善之为善，斯不善已。故有无相生，难易相成，长短相较，高下相倾，音声相和（hè），前后相随。是以圣人处无为之事，行不言之教，万物作焉而不辞，生而不有，为而不恃，功成而弗居。夫（fú）唯弗居，是以不去。",
    "【第三章】不尚贤，使民不争；不贵难得之货，使民不为盗；不见（xiàn）可欲，使民心不乱。是以圣人之治，虚其心，实其腹；弱其志，强其骨。常使民无知无欲，使夫（fú）智者不敢为也。为无为，则无不治。",
    "【第四章】道冲而用之或不盈，渊兮似万物之宗。挫其锐，解其纷，和其光，同其尘。湛兮似或存，吾不知谁之子，象帝之先。",
    "【第五章】天地不仁，以万物为刍（chú）狗；圣人不仁，以百姓为刍狗。天地之间，其犹橐龠（tuó yuè）乎？虚而不屈，动而愈出。多言数（shuò）穷，不如守中。",
    "【第六章】谷神不死，是谓玄牝（pìn），玄牝之门，是谓天地根。绵绵若存，用之不勤。",
    "【第七章】天长地久。天地所以能长且久者，以其不自生，故能长生。是以圣人后其身而身先，外其身而身存。非以其无私邪（yé）？故能成其私。",
    "【第八章】上善若水。水善利万物而不争，处众人之所恶（wù），故几（jī）于道。居善地，心善渊，与善仁，言善信，正善治，事善能，动善时。夫唯不争，故无尤。",
    "【第九章】持而盈之，不如其已。揣(chuǎi)而锐之，不可长保。金玉满堂，莫之能守。富贵而骄，自遗（yí）其咎。功成身退，天之道。",
    "【第十章】载（zài）营魄抱一，能无离乎？专气致柔，能婴儿乎？涤除玄览，能无疵乎？爱民治国，能无知（zhì）乎？天门开阖（hé），能无雌乎？明白四达，能无为乎？生之、畜（xù）之，生而不有，为而不恃，长（zhǎng）而不宰，是谓玄德。",
    "【第十一章】三十辐共一毂（gǔ），当其无，有车之用。埏埴（shān zhí）以为器，当其无，有器之用。凿户牖（yǒu）以为室，当其无，有室之用。故有之以为利，无之以为用。",
    "【第十二章】 五色令人目盲，五音令人耳聋，五味令人口爽，驰骋畋（tián）猎令人心发狂，难得之货令人行妨。是以圣人为腹不为目，故去彼取此。",
    "【第十三章】宠辱若惊，贵大患若身。何谓宠辱若惊？宠为下，得之若惊，失之若惊，是谓宠辱若惊。何谓贵大患若身？吾所以有大患者，为吾有身，及吾无身，吾有何患！故贵以身为天下，若可寄天下；爱以身为天下，若可托天下。",
    "【第十四章】视之不见名曰夷，听之不闻名曰希，搏之不得名曰微。此三者不可致诘（jié），故混（hùn）而为一。其上不皦（jiǎo皎），其下不昧。绳绳(mǐn mǐn )不可名，复归于无物，是谓无状之状，无物之象。是谓惚恍。迎之不见其首，随之不见其后。执古之道，以御今之有，能知古始，是谓道纪。",
    "【第十五章】古之善为士者，微妙玄通，深不可识。夫唯不可识，故强(qiǎng)为之容。豫焉若冬涉川，犹兮若畏四邻，俨兮其若容，涣兮若冰之将释，敦兮其若朴，旷兮其若谷，混兮其若浊。孰能浊以静之徐清？孰能安以久动之徐生？保此道者不欲盈，夫唯不盈，故能蔽不新成。",
    "【第十六章】致虚极，守静笃（dǔ），万物并作，吾以观复。夫物芸芸，各复归其根。归根曰静，是谓复命。复命曰常，知常曰明，不知常，妄作，凶。知常容，容乃公，公乃王（wàng），王（wàng）乃天，天乃道，道乃久，没（mò）身不殆。",
    "【第十七章】太上，下知有之。其次，亲而誉之。其次，畏之。其次，侮之。信不足焉，有不信焉。悠兮其贵言。功成事遂，百姓皆谓我自然。",
    "【第十八章】大道废，有仁义；慧智出，有大伪；六亲不和，有孝慈；国家昏乱，有忠臣。",
    "【第十九章】绝圣弃智，民利百倍；绝仁弃义，民复孝慈；绝巧弃利，盗贼无有。此三者，以为文不足，故令有所属，见（xiàn）素抱朴，少私寡欲。",
    "【第二十章】绝学无忧。唯之与阿（ē），相去几何？善之与恶，相去若何？人之所畏，不可不畏。荒兮其未央哉！众人熙熙，如享太牢，如春登台。我独泊兮其未兆，如婴儿之未孩。傫傫（lěi）兮若无所归。众人皆有余，而我独若遗。我愚人之心也哉！沌沌兮！俗人昭昭，我独昏昏；俗人察察，我独闷闷。澹（dàn）兮其若海，飂（liù）兮若无止。众人皆有以，而我独顽似鄙。我独异于人，而贵食(sì)母。",
    "【第二十一章】孔德之容，惟道是从。道之为物，惟恍惟惚。惚兮恍兮，其中有象；恍兮惚兮，其中有物。窈（yǎo）兮冥兮，其中有精；其精甚真，其中有信。自古及今，其名不去，以阅众甫。吾何以知众甫之状哉？以此。",
    "【第二十二章】曲则全，枉则直，洼则盈，敝则新，少则得，多则惑。是以圣人抱一，为天下式。不自见（xiàn）故明，不自是故彰，不自伐故有功，不自矜故长。夫唯不争，故天下莫能与之争。古之所谓曲则全者，岂虚言哉！诚全而归之。",
    "【第二十三章】希言自然。故飘风不终朝（zhāo），骤雨不终日。孰为此者？天地。天地尚不能久，而况于人乎？故从事于道者，道者同于道，德者同于德，失者同于失。同于道者，道亦乐得之；同于德者，德亦乐得之；同于失者，失亦乐得之。信不足焉，有不信焉。",
    "【第二十四章】企者不立，跨者不行，自见（xiàn）者不明，自是者不彰，自伐者无功，自矜者不长。其在道也，曰余食赘（zhuì）行。物或恶（wù）之，故有道者不处（chǔ）。",
    "【第二十五章】有物混（hùn）成，先天地生。寂兮寥兮，独立不改，周行而不殆，可以为天下母。吾不知其名，字之曰道，强(qiǎng)为之名曰大。大曰逝，逝曰远，远曰反。故道大，天大，地大，王亦大。域中有四大，而王居其一焉。人法地，地法天，天法道，道法自然。",
    "【第二十六章】重为轻根，静为躁君。是以圣人终日行不离辎（zī）重。虽有荣观（guàn），燕处超然，奈何万乘（shèng）之主，而以身轻天下？轻则失本，躁则失君。",
    "【第二十七章】善行无辙迹，善言无瑕谪(xiá zhé)，善数（shǔ）不用筹策，善闭无关楗（jiàn）而不可开，善结无绳约而不可解。是以圣人常善救人，故无弃人；常善救物，故无弃物，是谓袭明。故善人者，不善人之师；不善人者，善人之资。不贵其师，不爱其资，虽智大迷，是谓要妙。",
    "【第二十八章】知其雄，守其雌，为天下溪。为天下溪，常德不离，复归于婴儿。知其白，守其黑，为天下式。为天下式，常德不忒（tè），复归于无极。知其荣，守其辱，为天下谷。为天下谷，常德乃足，复归于朴。朴散则为器，圣人用之则为官长（zhǎng）。故大制不割。",
    "【第二十九章】将欲取天下而为之，吾见其不得已。天下神器，不可为也。为者败之，执者失之。故物或行或随，或歔（xū）或吹，或强或羸（léi），或挫或隳（huī）。是以圣人去甚，去奢，去泰。",
    "【第三十章】以道佐人主者，不以兵强天下，其事好（hào）还。师之所处，荆棘生焉。大军之后，必有凶年。善有果而已，不敢以取强。果而勿矜，果而勿伐，果而勿骄，果而不得已，果而勿强。物壮则老，是谓不道，不道早已。",
    "【第三十一章】夫佳兵者，不祥之器。物或恶（wù）之，故有道者不处（chǔ）。君子居则贵左，用兵则贵右。兵者，不祥之器，非君子之器。不得已而用之，恬淡为上，胜而不美。而美之者，是乐(yào)杀人。夫乐(yào)杀人者，则不可以得志于天下矣。吉事尚左，凶事尚右。偏将军居左，上将军居右，言以丧（sāng）礼处之。杀人之众，以哀悲泣之，战胜，以丧礼处之。",
    // "",
    // "",
  ];

  const randindex = Math.floor(Math.random() * theTaoteChing.length);

  return thinkingNormalBotMessageDone(theTaoteChing[randindex]);
}

export interface NormalBotMessageProps {
  content: string;

  isThinking: boolean;
  isTyping: boolean;

  onTypingDone?: () => void;
}

const NormalBotMessage: React.FC<NormalBotMessageProps & InnerProps> = (
  props
) => {
  const { id, content, isThinking, isTyping, onTypingDone } = props;

  const [dots, setDots] = useState<string>(".");
  const [rendermsg, setRendermsg] = useState<string>(isTyping ? "" : content);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isThinking) {
      return;
    }

    const interval = setInterval(() => {
      setDots((prevDots) => {
        return prevDots.length < 3 ? prevDots + "." : ".";
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isThinking]);

  useEffect(() => {
    if (isThinking) {
      return;
    }
    if (content.length === rendermsg.length) {
      return;
    }

    const interval = setInterval(() => {
      setRendermsg((prevContent) => {
        const nextchar = content[prevContent.length];

        if (nextchar !== undefined) {
          return prevContent + nextchar;
        }

        return prevContent;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [content]);

  useEffect(() => {
    if (isThinking) {
      return;
    }
    if (rendermsg.length !== content.length) {
      return;
    }

    dispatch(typingNormalBotMessageDone(id));

    if (onTypingDone) {
      onTypingDone();
    }
  }, [rendermsg]);

  useEffect(() => {
    dispatch(triggerScrollbottomSign());
  }, [rendermsg]);

  const clsname = useEmotionCss(() => {
    return {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "8px",
      marginTop: "8px",

      ".avater": {
        marginTop: "10px",
        marginRight: "5px",
        fontSize: "16px",
        height: "100%",
      },

      ".dialog-content": {
        border: "1px solid rgb(204, 204, 204)",
        borderRadius: "8px",
        padding: "7px 10px",
        backgroundColor: "rgb(240, 240, 240)",
        fontSize: "14px",
        minHeight: "37px",
      },
    };
  });

  const mdclsname = useEmotionCss(() => {
    return {
      lineHeight: 1.5,

      ol: {
        listStyle: "decimal",
        marginLeft: "30px",
      },
      ul: {
        listStyle: "disc",
      },
      "ul.contains-task-list": {
        listStyle: "none",
        paddingInlineStart: "30px",
      },
      pre: {
        margin: "5px 0",
      },
    };
  });

  return (
    <div className={clsname}>
      <div className="avater">
        <RobotOutlined />
      </div>
      <div className="dialog-content">
        {isThinking ? (
          dots
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath, remarkEmoji]}
            rehypePlugins={[rehypeRaw, rehypeKatex as any]}
            className={mdclsname}
            components={{
              code({ inline, className, children, ...props1 }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props1}
                    style={atomOneLight}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props1} className={className}>
                    {children}
                  </code>
                );
              },
              a({ children, href }) {
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              },
            }}
          >
            {rendermsg}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default NormalBotMessage;
