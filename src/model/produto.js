const Sequelize = require("sequelize");
const database = require("./database");
var categoria = require('./categoriaproduto');

const Produto = database.define("produto", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  versao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tamanho: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  publicacao: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  preco: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  classificacao: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  capa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  popular: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  descricao: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  prints: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  categoriaid:{
    type: Sequelize.INTEGER,
    references: {
      model: categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'produto',
  timestamps: false
});

Produto.belongsTo(categoria, { foreignKey: 'categoriaid'});

const createProduto = async() => {
  const produtos = [
    { emp: 'Microsoft', nome: 'Visual Studio Code', versao: '1.20', tamanho: '40', publicacao: '2015-04-29', preco: 0, classificacao: 5, imagem: 'https://miro.medium.com/v2/resize:fit:1170/1*BnpPe7u0t-e8hHc-qEmgSQ.png', capa: 'https://code.visualstudio.com/opengraphimg/opengraph-home.png', popular: true, descricao: 'O Visual Studio Code é um editor de código-fonte desenvolvido pela Microsoft para Windows, Linux e macOS. Ele inclui suporte para depuração, controle de versionamento Git incorporado, realce de sintaxe, complementação inteligente de código, snippets e refatoração de código. Ele é customizável, permitindo que os usuários possam mudar o tema do editor, teclas de atalho e preferências. Ele é um software livre e de código aberto, apesar do download oficial estar sob uma licença proprietária.', prints: 'https://en.opensuse.org/images/a/a8/VS_Code_screenshot.png|https://www.windowslatest.com/wp-content/uploads/2017/02/visual-studio-code.png', categoriaid: 1},
    { emp: 'The Eclipse Foundation', nome: 'Eclipse', versao: '4.19', tamanho: '500', publicacao: '2021-03-17', preco: 0, classificacao: 4.5, imagem: 'https://keyholesoftware.com/wp-content/uploads/eclipse-IDE.jpg', capa: 'https://www.zdnet.com/a/img/resize/8c834eca411e21f7249bf194b8b7537bf019c642/2016/03/08/f6fef56a-748a-4261-960f-33eb9b7c731e/eclipse-che.jpg?auto=webp&width=1280', popular: true, descricao: 'Eclipse é um ambiente de desenvolvimento integrado (IDE) usado em programação de computador, originalmente criado pela IBM. Ele é popular por sua capacidade de ser extensível através de plugins.', prints:'https://www.eclipse.org/community/eclipse_newsletter/2016/august/images/cheworkspace.png|https://aneescraftsmanship.com/wp-content/uploads/2021/10/a0.144.png', categoriaid: 1},
    { emp: 'Adobe', nome: 'Adobe Photoshop', versao: '22.4', tamanho: '2000', publicacao: '2021-05-10', preco: 239, classificacao: 4.7, imagem: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b4/19/0a/b4190aad-77f5-3935-f2ad-fb95a5d73977/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png', capa: 'https://helpx.adobe.com/content/dam/help/en/photoshop/get-started/workspace.png', prints: 'https://media.gcflearnfree.org/content/55e0914924929be0279509cf_05_29_2014/start_intro_flower.jpg|https://www.lifewire.com/thmb/sW54x8D3yfDVsrxoQCbShuSjPes=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/photoshopwelcomescreen-b9eee1516703467f93ef35fa984a6267.jpg', popular: true, descricao: 'Adobe Photoshop é um software de edição de imagem desenvolvido e publicado pela Adobe Inc. Ele é o padrão da indústria para edição de gráficos raster e arte digital.', categoriaid: 2},
    { emp: 'Sketch B.V.', nome: 'Sketch', versao: '70.3', tamanho: '40', publicacao: '2020-11-17', preco: 99, classificacao: 4.5, imagem: 'https://logovectorseek.com/wp-content/uploads/2020/12/sketch-b-v-logo-vector.png', capa: 'https://sketch-cdn.imgix.net/assets/pages/design/vector-editing%402x.png?ixlib=rb-4.1.0&dpr=0.5&q=100&fm=png&auto=format&s=48a53b001cc81b4e285c6034f5335121', popular: true, descricao: 'Sketch é um editor gráfico de vetor para macOS desenvolvido pela empresa holandesa Sketch B.V. Ele é conhecido por seu uso em design de interface de usuário e experiência do usuário.', prints: 'https://software.com.br/images/product/24802/1635592023022763fd061f6f114.png|https://software.com.br/images/product/24802/1636432023022763fd064b94cb0.png', categoriaid: 2},
    { emp: 'Ableton', nome: 'Ableton Live', versao: '11', tamanho: '3000', publicacao: '2021-02-23', preco: 749, classificacao: 4.9, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnUx7qM58_X1Pecz1loqmt-_Tobv263fu1rQ&s', capa: 'https://edutools.tec.mx/sites/default/files/styles/large/public/2021-12/Ableton-Live%20-%20Miguel%20Angel%20Pe%CC%81rez%20Sibaja.png?itok=b3NueW0Q', popular: true, descricao: 'Ableton Live é uma estação de trabalho de áudio digital e um software de sequenciamento musical. Ele é projetado para ser um instrumento para apresentações ao vivo, bem como uma ferramenta para composição e produção.', prints: 'https://ableton-production.imgix.net/components/text-beside-media/web-browser-lavender-light.png?auto=compress%2Cformat&w=768|https://i.pcmag.com/imagery/reviews/026WYE4XN99dDtWflTxyi5l-33.fit_lim.size_1050x.jpg', categoriaid: 3},
    { emp: 'Steinberg', nome: 'Cubase', versao: '11', tamanho: '2100', publicacao: '2020-11-11', preco: 579, classificacao: 4.8, imagem: 'https://splice-res.cloudinary.com/image/upload/f_auto,q_auto/v1682111660/gear/features/Steinberg_Cubase-Mini-700x700-04.png', capa: 'https://splice-res.cloudinary.com/image/upload/v1698780124/gear/share_images/Cubase13-product_shareImage-1.png', popular: true, descricao: 'Cubase é uma estação de trabalho de áudio digital desenvolvida pela Steinberg para gravação, arranjo e edição de música e MIDI. Ele é amplamente utilizado em estúdios de gravação e por produtores de música.', prints: 'https://pt.yamaha.com/pt/files/Cubase-AI12-image1_2222c08957685aba3b67763dc0402771.jpg?impolicy=resize&imwid=1000&imhei=606|https://ocl-steinberg-live.steinberg.net/_storage/asset/247228/storage/PNG_extra-large_5500px/247228-extra-large.png', categoriaid: 3},
    { emp: 'Google', nome: 'Google Chrome', versao: '91', tamanho: '80', publicacao: '2021-05-25', preco: 0, classificacao: 4.9, imagem:'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/1_-_Cover.width-1300.png', capa: 'https://www.google.com/chrome/static/images/intl/pt_PT/homepage/fast/mobile-xp/fast-mobile_desktop.png', popular: true, descricao: 'Google Chrome é um navegador da web desenvolvido pelo Google. Ele é conhecido por sua velocidade, simplicidade e segurança, oferecendo navegação rápida e segura.', prints: 'https://media.askvg.com/articles/images7/Download_Google_Chrome_Full_Standalone_Offline_Installer.png|https://treejava923.weebly.com/uploads/1/2/6/7/126745647/643175079.jpg', categoriaid: 4},
    { emp: 'Mozilla', nome: 'Mozilla Firefox', versao: '89', tamanho: '50', publicacao: '2021-06-01', preco: 0, classificacao: 4.8, imagem: 'https://pplware.sapo.pt/wp-content/uploads/2019/07/firefox68_capa.jpg', capa: 'https://www.mozilla.org/media/img/firefox/new/desktop/meta-img-global.fb0291b70586.png', popular: true, descricao: 'Mozilla Firefox é um navegador da web gratuito e de código aberto desenvolvido pela Mozilla Foundation. Ele é conhecido por seu desempenho rápido e forte foco em privacidade e segurança.', prints: 'https://pplware.sapo.pt/wp-content/uploads/2021/06/pplware_firefox_89_1.jpg|https://i.pcmag.com/imagery/reviews/02P17YReLaRiljWtcJVL0hs-1.fit_lim.size_2324x1631.v_1569469961.jpg', categoriaid: 4}
  ];

  try{
    // await database.sync();
    await Produto.bulkCreate(produtos, {ignoreDuplicates: true});
    console.log("Produtos criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar produtos: ", error);
  }
}

createProduto();


module.exports = Produto;
