import style from "./index.less";

const Me: React.FC = () => {
  return (
    <div className={style.meview}>
      <div className="scrollview">
        <div className="authordsc">
          <div className="fixed">
            <div className="sm-row">
              <div
                className="avatar"
                style={{ backgroundImage: `url("mine.jpg")` }}
              />
              <div className="sm-col">
                <div className="author-name">Dugan (吕翔)</div>
                <div className="author-bio">
                  <p>
                    Focusing on full stack development, quantitative
                    development, and AI.
                  </p>
                </div>
              </div>
            </div>
            <div className="author-url">
              <ul>
                <li>
                  <svg
                    height="16px"
                    viewBox="0 0 48 48"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                  </svg>
                  <div className="desc">Shenzhen, China</div>
                </li>
                <li>
                  <svg
                    version="1.1"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    height="16px"
                    width="16px"
                  >
                    <g id="info" />
                    <g id="icons">
                      <path
                        d="M20,3H4C1.8,3,0,4.8,0,7v10c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4V7C24,4.8,22.2,3,20,3z M21.6,8.8l-7.9,5.3   c-0.5,0.3-1.1,0.5-1.7,0.5s-1.2-0.2-1.7-0.5L2.4,8.8C2,8.5,1.9,7.9,2.2,7.4C2.5,7,3.1,6.9,3.6,7.2l7.9,5.3c0.3,0.2,0.8,0.2,1.1,0   l7.9-5.3c0.5-0.3,1.1-0.2,1.4,0.3C22.1,7.9,22,8.5,21.6,8.8z"
                        id="email"
                      />
                    </g>
                  </svg>
                  <div className="desc">lvxiang@jhlfund.com</div>
                </li>
                <li>
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    width="16px"
                  >
                    <title />
                    <g data-name="WE CHAT" id="WE_CHAT">
                      <rect
                        style={{ fill: "none" }}
                        height="32"
                        id="Frame"
                        width="32"
                      />
                      <g id="WeChat">
                        <path d="M15.60913,12.84985a.79184.79184,0,1,0-.79187-.79187A.7918.7918,0,0,0,15.60913,12.84985Z" />
                        <path d="M11.08423,11.26617a.79184.79184,0,1,0,.79187.79181A.7918.7918,0,0,0,11.08423,11.26617Z" />
                        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM13.345,18.505a7.60572,7.60572,0,0,1-1.74-.2.54287.54287,0,0,0-.43.07l-1.52.97a.06272.06272,0,0,1-.09-.05l-.06-1.61a.557.557,0,0,0-.25-.43,4.76794,4.76794,0,0,1-2.13-3.84c0-2.82,2.78-5.09,6.22-5.09s6.22,2.27,6.22,5.09a3.60288,3.60288,0,0,1-.06.66c-2.97.05-5.4,1.98-5.61,4.4A5.063,5.063,0,0,1,13.345,18.505Zm9.75,3.51a.76261.76261,0,0,0-.31995.57l-.04,1.09-1.06-.68a.76538.76538,0,0,0-.39-.11.55474.55474,0,0,0-.18.02,6.58172,6.58172,0,0,1-1.48.17c-2.9,0-5.25-1.91-5.25-4.25a2.59285,2.59285,0,0,1,.03-.4c.24-2.09,2.36-3.75,4.99-3.84a1.76769,1.76769,0,0,1,.23-.01c2.9,0,5.25,1.91,5.25,4.25A3.96612,3.96612,0,0,1,23.095,22.015Z" />
                        <circle cx="21.625" cy="17.625" r="0.70001" />
                        <path d="M17.815,16.955a.58165.58165,0,0,0-.19-.03.69959.69959,0,0,0-.7.65v.05a.7.7,0,0,0,1.4,0A.68726.68726,0,0,0,17.815,16.955Z" />
                      </g>
                    </g>
                  </svg>
                  <div className="desc">Duganlx</div>
                </li>
                <li
                  className="link"
                  onClick={() => {
                    window.open("https://github.com/duganlx");
                  }}
                >
                  <svg
                    enableBackground="new -1163 1657.697 56.693 56.693"
                    id="Layer_1"
                    version="1.1"
                    viewBox="-1163 1657.697 56.693 56.693"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    height="16px"
                    width="16px"
                  >
                    <g>
                      <path
                        clipRule="evenodd"
                        d="M-1134.6598,1662.9163c-13.601,0-24.63,11.0267-24.63,24.6299   c0,10.8821,7.0573,20.1144,16.8435,23.3713c1.2308,0.2279,1.6829-0.5345,1.6829-1.1849c0-0.587-0.0227-2.5276-0.0334-4.5857   c-6.8521,1.4901-8.2979-2.906-8.2979-2.906c-1.1205-2.8467-2.7347-3.6039-2.7347-3.6039   c-2.2349-1.5287,0.1685-1.4972,0.1685-1.4972c2.473,0.1737,3.7755,2.5385,3.7755,2.5385c2.1967,3.7651,5.7618,2.6765,7.1675,2.0472   c0.2211-1.5917,0.8591-2.6786,1.5637-3.2936c-5.4707-0.6226-11.2218-2.7347-11.2218-12.1722c0-2.6888,0.9623-4.8861,2.538-6.611   c-0.2557-0.6206-1.0989-3.1255,0.2386-6.5183c0,0,2.0684-0.6616,6.7747,2.525c1.9648-0.5458,4.0719-0.8195,6.165-0.829   c2.093,0.0095,4.2017,0.2832,6.17,0.829c4.7012-3.1866,6.7665-2.525,6.7665-2.525c1.3406,3.3928,0.4974,5.8977,0.2417,6.5183   c1.5793,1.7249,2.5348,3.9221,2.5348,6.611c0,9.4602-5.7618,11.5428-11.2465,12.1527c0.8834,0.7644,1.6704,2.2632,1.6704,4.561   c0,3.2955-0.0282,5.9479-0.0282,6.7592c0,0.6556,0.4432,1.4236,1.6915,1.1818c9.7812-3.2605,16.8296-12.4896,16.8296-23.3682   C-1110.0299,1673.943-1121.0574,1662.9163-1134.6598,1662.9163z"
                        fillRule="evenodd"
                      />
                      <path d="M-1149.9611,1698.2793c-0.0542,0.1227-0.2469,0.1593-0.4222,0.0753c-0.1788-0.0804-0.2788-0.2473-0.2211-0.37   c0.053-0.126,0.2457-0.161,0.4242-0.0769C-1150.0013,1697.9882-1149.8993,1698.1566-1149.9611,1698.2793L-1149.9611,1698.2793z    M-1150.2642,1698.0547" />
                      <path d="M-1148.9634,1699.3922c-0.1174,0.1086-0.3473,0.0581-0.5031-0.1139c-0.1613-0.1718-0.1912-0.4016-0.072-0.5118   c0.1211-0.1088,0.3438-0.0579,0.505,0.1139C-1148.8721,1699.0541-1148.8407,1699.2819-1148.9634,1699.3922L-1148.9634,1699.3922z    M-1149.1984,1699.14" />
                      <path d="M-1147.9922,1700.8105c-0.151,0.1051-0.3979,0.0067-0.5505-0.2123c-0.151-0.2191-0.151-0.4819,0.0035-0.5872   c0.1526-0.1051,0.396-0.0104,0.5505,0.2068C-1147.8381,1700.4406-1147.8381,1700.7034-1147.9922,1700.8105L-1147.9922,1700.8105z    M-1147.9922,1700.8105" />
                      <path d="M-1146.6619,1702.1812c-0.1351,0.1489-0.4227,0.1086-0.6329-0.0945c-0.2155-0.1984-0.2753-0.4803-0.1403-0.6293   c0.1371-0.149,0.4263-0.1072,0.6381,0.0944C-1146.5831,1701.7501-1146.5182,1702.0337-1146.6619,1702.1812L-1146.6619,1702.1812z    M-1146.6619,1702.1812" />
                      <path d="M-1144.8265,1702.9769c-0.0597,0.1927-0.3365,0.2804-0.6154,0.1984c-0.2788-0.0845-0.4608-0.3103-0.4047-0.5051   c0.0577-0.1943,0.3361-0.2855,0.6169-0.1979C-1144.9512,1702.5563-1144.7688,1702.7805-1144.8265,1702.9769L-1144.8265,1702.9769z    M-1144.8265,1702.9769" />
                      <path d="M-1142.8107,1703.1243c0.0067,0.2031-0.2299,0.3716-0.5226,0.3752c-0.2944,0.0067-0.533-0.1577-0.5361-0.3577   c0-0.2052,0.2313-0.3717,0.5258-0.3768C-1143.0509,1702.7594-1142.8107,1702.9227-1142.8107,1703.1243L-1142.8107,1703.1243z    M-1142.8107,1703.1243" />
                      <path d="M-1140.9351,1702.8052c0.035,0.198-0.1686,0.4015-0.4594,0.4557c-0.2859,0.0526-0.5504-0.0701-0.587-0.2665   c-0.0354-0.2031,0.1716-0.4066,0.4573-0.4592C-1141.233,1702.4846-1140.9722,1702.6036-1140.9351,1702.8052L-1140.9351,1702.8052z    M-1140.9351,1702.8052" />
                    </g>
                  </svg>
                  <div className="desc">Github</div>
                </li>
                <li
                  className="link"
                  onClick={() => {
                    window.open("https://orcid.org/0000-0003-3660-6349");
                  }}
                >
                  <svg
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    width="16px"
                  >
                    <path d="M294.75 188.19h-45.92V342h47.47c67.62 0 83.12-51.34 83.12-76.91 0-41.64-26.54-76.9-84.67-76.9zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-80.79 360.76h-29.84v-207.5h29.84zm-14.92-231.14a19.57 19.57 0 1 1 19.57-19.57 19.64 19.64 0 0 1-19.57 19.57zM300 369h-81V161.26h80.6c76.73 0 110.44 54.83 110.44 103.85C410 318.39 368.38 369 300 369z" />
                  </svg>
                  <div className="desc">ORCID</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="contentview">
          <div className="item">
            <p>
              I am currently working as a full stack developer in{" "}
              <a
                href="http://www.jhlfund.com/about"
                target="_blank"
                rel="noopener noreferrer"
              >
                Evoluation Asset Management,Ltd
              </a>
              . in Shenzhen, China. I am responsible for the construction and
              maintenance of QuantWeb, the company&apos;s system center, so as
              to better support the work of colleagues in other business
              departments of the company. The specifics of the work can be
              abstracted into four areas, specifically:
              <ol>
                <li>
                  (Analysis) When a colleague from another department raises a
                  new requirement, I need to communicate with that colleague to
                  understand his claim and the desired effect. Next, I need to
                  assess the value and urgency of the requirement.
                </li>
                <li>
                  (Design) I need to go for prototype drawings based on the
                  requirements and check with that colleague for functionality
                  and style.
                </li>
                <li>
                  (Development) Utilizing the expertise I have, I choose the
                  appropriate way to code the functionality for implementation.
                  After self-testing for accuracy, deployed the program to the
                  test environment and notified the test engineers to validate
                  the developed functionality.
                </li>
                <li>
                  (Testing) Analyze and deal with the problems identified. Once
                  all issues have been addressed, the program will be deployed
                  to the production environment and made available to business
                  colleagues to use and receive feedback.
                </li>
              </ol>
            </p>
            <p>
              My professional skills include Front-end development (React +
              Typescript), Back-end development (Kratos + Golang), Bash, Python,
              SQL. my English level is up to CET6.
            </p>
            <p>
              I did my undergraduate study at Beijing Institute of Technology
              (Zhuhai) and postgraduate study at Shanghai Maritime University
              under the supervision of Prof.{" "}
              <a
                href="https://cie.shmtu.edu.cn/2020/1214/c6356a49390/page.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Han Dezhi (韩德志)
              </a>
              . During my graduate studies, I was awarded the National
              Scholarship for Master&apos;s Students (Top 1%).
            </p>
            <p>
              If you are interested in the code implementation of the site,
              welcome to star and fork my open-sourced repository{" "}
              <a
                href="https://github.com/duganlx/kiGo"
                target="_blank"
                rel="noopener noreferrer"
              >
                kiGo
              </a>
              .
            </p>
          </div>
          <div className="item">
            <div className="title">🎯 Projects</div>
            <div>
              <ul>
                <li>
                  kiGo. A website developed using the ant design pro template,
                  which is the source code for the site you are looking at
                  now.&nbsp;
                  <a
                    href="https://github.com/duganlx/kiGo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    repository
                  </a>
                </li>
                <li>
                  xubuntu-docker. This is a visual ubuntu development
                  environment used to create and initialize in Docker.&nbsp;
                  <a
                    href="https://github.com/duganlx/xubuntu-docker"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    repository
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="item">
            <div className="title">👔 Experiences</div>
            <ul>
              <li>
                2023.06 - now.&nbsp;
                <a
                  href="http://www.jhlfund.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Evoluation Asset Management,Ltd
                </a>
                . Full-Stack Developer.
              </li>
            </ul>
          </div>
          <div className="item">
            <div className="title">💻 Internships</div>
            <ul>
              <li>
                2022.08 - 2023.04.&nbsp;
                <a
                  href="http://www.jhlfund.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Evoluation Asset Management,Ltd
                </a>
                . Full-Stack Developer Intern.
              </li>
              <li>
                2022.04 - 2022.07.&nbsp;
                <a
                  href="http://datauseful.com/AboutUs-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shanghai Yousifu Information Technology Co.,Ltd
                </a>
                . Go Developer Intern.
              </li>
              <li>
                2021.03 - 2021.07.&nbsp;
                <a
                  href="http://www.jore-tech.com/frontAboutUs.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zhuhai Jierui Technology Co.,Ltd
                </a>
                . Java Developer Intern.
              </li>
            </ul>
          </div>
          <div className="item">
            <div className="title">📖 Educations</div>
            <ul>
              <li>
                2021.09 - 2023.06. Master. Shanghai Maritime University.
                Shanghai. Software Engineering. GPA: 87/100. Rank: 29/181.
              </li>
              <li>
                2017.09 - 2021.06. Bachelor. Beijing Institute Of Technology
                (Zhuhai). Zhuhai. Computer Science and Technology. GPA: 91/100.
                Rank: 1/147.
              </li>
              <li>
                2014.09 - 2017.06. Shenzhen Nanshan Foreign Language School.
                Shenzhen.
              </li>
            </ul>
          </div>
          <div className="item">
            <div className="title">🏆 Honors and Awards</div>
            <ul>
              <li>
                2023. Honorary Title for Outstanding Graduates of Shanghai
                Ordinary Higher Education Institutions in 2023.
              </li>
              <li>
                2022. Received the National Scholarship for Master&apos;s Degree
                at Shanghai Maritime University.
              </li>
              <li>
                2022. Published a paper in the EURASIP Journal on Wireless
                Communications and Networking titled &apos;
                <a
                  href="https://jwcn-eurasipjournals.springeropen.com/articles/10.1186/s13638-022-02180-w"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Network Abnormal Traffic Detection Method Based on Fusion of
                  Chord Similarity and Multiple Loss Encoder
                </a>
                &apos;.
              </li>
              <li>
                2021. Second Prize in the 18th China Graduate Mathematical
                Modeling Competition &quot;Huawei Cup&quot;.
              </li>
              <li>
                2021. Honorary Title for Outstanding Graduates of Beijing
                Institute of Technology(Zhuhai) in 2021.
              </li>
              <li>
                2021-2023. Served as the Propaganda Committee Member of the
                Party Branch of the CPC for 2021 professional master student of
                Shanghai Maritime University.
              </li>
              <li>
                2017-2021. Received seven scholarships from Beijing University
                of Technology(Zhuhai) including three special scholarships(Top
                1%), three first-class scholarships(Top 5%), and one
                second-class scholarship(Top 10%).
              </li>
              <li>
                2017-2020. Received the honorary title of &quot;Outstanding
                Student&quot; from Beijing University of Technology(Zhuhai) for
                three consecutive years.
              </li>
              <li>
                2020. Second Prize of the 12th National College Student
                Mathematics Competition (Guangdong Provincial Competition).
              </li>
              <li>
                2019. Second Prize in the Campus Selection Competition of the
                9th ACM/ICPC Program Design Competion of Beijing Institute of
                Technology, Zhuhai.
              </li>
              <li>
                2019. Participated in the research and development of the school
                level college student innovation and entrepreneurship training
                project &quot;Online Practice System Based on WeChat Mini
                Programs&quot;. The project was successfully completed,
                obtaining two computer software copyright registration
                certificates and publishing a paper in the journal &quot;
                Computer Knowledge and Technology&quot;.
              </li>
              <li>
                2018. Participated in the research and development of the
                provincial college student innovation and entrepreneurship
                training project &quot;Smart Campus Face Recognition
                System&quot;。 The project was successfully completed, obtaining
                a software copyright registration certificate and publishing a
                paper in the journal &quot;Modern Computer&quot;.
              </li>
              <li>
                2017-2021. Served as the life committe member of Class 2 in
                Computer Science and Technology.
              </li>
              <li>
                2017. Third Prize of the 7th C Language Programming Challenge
                Cup at Beijing University of Technology, Zhuhai.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;
