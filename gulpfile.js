﻿const  gulp = require('gulp');
const  concat = require('gulp-concat');                        //- 多个文件合并为一个
const  replace = require('gulp-replace');                      //- 文本替换
const  autoprefixer = require('gulp-autoprefixer');            //- 补充浏览器前缀
const  cleanCSS = require('gulp-clean-css');                   //- 压缩CSS为一行
const  px3rem = require('gulp-px3rem');                        //- px转rem
const  uncss = require('gulp-uncss');                          //- 删除没用到的css
const  csso = require('gulp-csso');                            //- 深入优化css
const  sass = require('gulp-sass');                            //- scss文件编译
const  css64 = require('gulp-base64');                         //- css文件转base64
const  img64 = require('gulp-allimgbase64');                   //- img转base64
const  tinypng = require('gulp-tinypng-nokey');                //- png图片压缩
const  spritesmith = require('gulp.spritesmith');              //- css雪碧图
const  merge = require('merge-stream');                        //- 合并流
const  svgmin = require('gulp-svgmin');                        //- svg图片压缩
const  svgSprite = require("gulp-svg-sprites");                //- svg合并
const  svg2png = require("gulp-svg2png");                      //- svg转png
const  svgcss = require('gulp-svg-css');                       //- svg-datauri
const  webp = require('gulp-webp');                            //- 转webp图片
const  responsive = require('gulp-responsive');                //- 转rwd图片
const  imageSet = require('gulp-image-set-plus');              //- 兼容images-set
const  lazyScr = require('gulp-lazysizes-srcset');             //- 设置scrset
const  fontSpider = require('gulp-font-spider');               //- 删除没用到的字体
const  processhtml = require('gulp-processhtml');              //- html更改模板
const  htmlmin = require('gulp-htmlmin');                      //- html压缩
const  uglify = require('gulp-uglify');                        //- js压缩
const  rev = require('gulp-rev');                              //- 添加哈希值
const  revCollector = require('gulp-rev-collector');           //- 改为哈希值版本路径
const  htmlurl = require('gulp-html-url-prefix-custom');       //- html文件添加域名前缀
const  pump = require('pump');                                 //- 报错提示
const  browserSync = require('browser-sync');                  //- 浏览器同步测试工具
const  del = require('del');                                   //- 删除文件功能模块
const  path = require("path");                                 //- 路径模块

const  y_Sz="src";                                             //- 源码版本
const  y_Dz="dist";                                            //- 上线版本
const  y_Rz="rev";                                             //- 缓存版本
const  y_Rn="revjson";                                         //- 缓存json	

/*------------------------------Del dist----------------------------------*/

function distDelFile(){
	return del('./'+y_Dz+'/');
}

gulp.task(distDelFile)

/*------------------------------cssSprite---------------------------------*/

function imgSprite(){
	var spriteData = gulp.src('./'+y_Sz+'/static/img/icon/*.png').pipe(spritesmith({
	imgName: 'sprite.png',
	cssName: 'icon-sprite.css',
	algorithm: 'top-down',
	cssTemplate: './'+y_Sz+'/static/img/icon/sprite.css.handlebars'
	}));
	
	var imgStream = spriteData.img
	.pipe(gulp.dest('./'+y_Sz+'/static/img/icon/'));
 
	var cssStream = spriteData.css
	.pipe(csso())
	.pipe(gulp.dest('./'+y_Sz+'/static/css/'));
	
	return merge(imgStream, cssStream);
}

function delIcon(){
	return del('./'+y_Sz+'/static/img/icon/sprite.png');	
}

gulp.task('cssSprite', gulp.series(delIcon, imgSprite));

/*------------------------------SVG----------------------------------*/

function svgCss(){                   
	return gulp.src('./'+y_Sz+'/static/img/svg/sprite.svg')
	.pipe(svgcss({fileName: 'svgcss', cssPrefix: 'svg-',}))                    //- DataURI方案
	.pipe(gulp.dest('./'+y_Sz+'/static/css/'));	
}

function svgMin(){                   
	return gulp.src('./'+y_Sz+'/static/img/svg/sprite.svg')
	.pipe(svgmin())                                                            //- 压缩文件	
	.pipe(svg2png())                                                           //- svg转png
	.pipe(gulp.dest('./'+y_Sz+'/static/img/svg/'));	
}

function svgDeal(){	
	var config = {	
	templates: {
		css: require("fs").readFileSync('./'+y_Sz+'/static/img/svg/sprite.css', "utf-8")		
	},
	common: 'svg-sprite',
	cssFile: '../css/svg-sprite.css',
	pngPath: '../img/svg/sprite.png',
	svgPath: '../img/svg/sprite.svg',
	svg: {sprite: '../img/svg/sprite.svg'},
	baseSize: 100,
	preview: false
	};
	return gulp.src('./'+y_Sz+'/static/img/svg/*.svg')
	.pipe(svgSprite(config))	
	.pipe(gulp.dest('./'+y_Sz+'/static/img/'));
}

function svgDel(){
	return del('./'+y_Sz+'/static/img/svg/sprite.svg')	
}

gulp.task('svgSprite', gulp.series(svgDel, svgDeal, svgMin, svgCss));

/*-------------------------------Css-------------------------------------*/

function cssAuto(){
	return gulp.src(['./'+y_Dz+'/static/css/*.css'])
	.pipe(autoprefixer({
		browsers: [
		'last 2 version',                                 //- 主流浏览器的最新两个版本
		'ios 7',                                          //- IOS7版本
		'android 2.3',                                    //- android 2.3版本
		'last 2 Explorer versions'],                      //- IE的最新两个版本 'last 2 Explorer versions'
		cascade: true,                                    //- 是否美化属性值 默认：true 
		remove:true                                       //- 是否去掉不必要的前缀 默认：true 
	}))
	.pipe(gulp.dest('./'+y_Dz+'/static/css/'));	
}

function CSSO(){
	return gulp.src(['./'+y_Dz+'/static/css/*.css'])
	.pipe(csso())
	.pipe(gulp.dest('./'+y_Dz+'/static/css/'));	
}

function ImageSet(){	
	return gulp.src(['./'+y_Dz+'/static/css/*.css'])
	.pipe(imageSet())
	.pipe(gulp.dest('./'+y_Dz+'/static/css/'));
}

function CleanCss(){
	return gulp.src(['./'+y_Dz+'/static/css/*.css'])
	.pipe(cleanCSS({compatibility: 'ie8',keepSpecialComments: '*'}))
	.pipe(gulp.dest('./'+y_Dz+'/static/css/'));	
}

function cssMin(){	
	return gulp.src(['./'+y_Sz+'/static/css/*.css'])          //- 需要处理的css文件，放到一个字符串数组里								
	.pipe(px3rem({remUnit: 100}))                             //- px/100转rem值，如果有不想转换的类在值后面加/*no*/
	.pipe(uncss({
	html: ['./'+y_Sz+'/**/*.html'],                           //- 检查的页面
	ignore: ['abc', '.abc', '#abc']                           //- 忽略的标签 class or id or 分号隔开
	}))
	.pipe(concat('index.css'))                                //- 合并后的文件名
	.pipe(gulp.dest('./'+y_Dz+'/static/css/'));
}

function Sass(){
	return gulp.src('./'+y_Sz+'/static/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./'+y_Sz+'/static/css/'));
}

gulp.task('cssAll', gulp.series(Sass, cssMin, CleanCss, ImageSet, CSSO, cssAuto));

/*------------------------------Img----------------------------------*/

function imgCopy(){
	return gulp.src(['./'+y_Sz+'/static/img/*.gif'],{        //- 复制一些不需要处理的图片
	base: './'+y_Sz+'/static/img/'})
	.pipe(gulp.dest('./'+y_Dz+'/static/img/'));	
}

function imgMin(){
	return gulp.src(['./'+y_Sz+'/static/img/**/*.{png,jpg}', '!./'+y_Sz+'/static/img/icon/icon*.png'])
	.pipe(tinypng())
	.pipe(gulp.dest('./'+y_Dz+'/static/img/'));
}

function rwdImg(){                      //- 生成rwd图片
	return gulp.src('./'+y_Sz+'/static/img/rwd/*.{png,jpg}')
	.pipe(responsive({
	'*': [
	{width: '25%',rename: {suffix: '@1x'}},
	{width: '50%',rename: {suffix: '@2x'}},
	{width: '75%',rename: {suffix: '@3x'}},
	{width: '100%',rename: {suffix: ''}}
	]},
	{
	progressive: true,
	withMetadata: false,
	errorOnEnlargement: false,
	}))
	.pipe(gulp.dest('./'+y_Sz+'/static/img/rwd/'));
}

function delrwdImg(){				
	return del(['./'+y_Sz+'/static/img/**/*@*.*']);		
}

gulp.task('imgAll', gulp.series(delrwdImg, rwdImg, imgMin, imgCopy));

/*------------------------------Html----------------------------------*/

function htmlDeal(){
	return gulp.src('./'+y_Sz+'/*.html')
	.pipe(processhtml())
	.pipe(lazyScr({
	decodeEntities: false,
	data_src: 'data-src',
	data_srcset: 'data-srcset',
	suffix: {'1x': '@1x', '2x': '@2x', '3x': '@3x', '4x': ''}
	}))
	.pipe(gulp.dest('./'+y_Dz+'/'));
};

gulp.task(htmlDeal);

/*------------------------------Font----------------------------------*/

function FontCopy(){
	return gulp.src(['./'+y_Sz+'/static/font/**'],{                  //- 被复制的文件夹下的所有文件
	base: './'+y_Sz+'/static/font'})                                 //- 被复制的目标路径 	
	.pipe(gulp.dest('./'+y_Dz+'/static/font/'));				
}

function FontSpider(){
	return gulp.src(path.resolve(process.cwd(), y_Sz) + '/*.html')	
	.pipe(fontSpider());
}

gulp.task('fontAll', gulp.series(FontSpider,FontCopy));

/*------------------------------Jsmin----------------------------------*/

gulp.task('jsMin', function (cb) {
	pump([
	gulp.src('./'+y_Sz+'/static/js/*.js'),
	uglify(),
	concat('index.js'),
	gulp.dest('./'+y_Dz+'/static/js/')
	],cb);
})

/*------------------------------Webp----------------------------------*/

function webpDel(){				
	return del(['./'+y_Dz+'/static/img/**/*.{jpg,png}', '!./'+y_Dz+'/static/img/**/*.{webp}']);		
}

function webp_css(){
	return gulp.src(['./'+y_Dz+'/static/css/*.css'])	
	.pipe(replace(/.(jpg|png)/gi,'.webp'))
	.pipe(gulp.dest('./'+y_Dz+'/static/css/'));				
}

function webp_html(){					
	return gulp.src('./'+y_Dz+'/*.html')
	.pipe(replace(/.(jpg|png)/gi,'.webp'))
	.pipe(gulp.dest('./'+y_Dz+'/'));
}

function webp_img(){
	return gulp.src('./'+y_Dz+'/static/img/**/*.{jpg,png}')		
	.pipe(webp({lossless:true}))
	.pipe(gulp.dest('./'+y_Dz+'/static/img/'));
}

gulp.task('webpAll', gulp.series(webp_img, webp_html, webp_css, webpDel));

/*------------------------------HtmlBase64---------------------------------*/

function htmlBase64 () {					
	return gulp.src('./'+y_Dz+'/*.html')
   	.pipe(img64({limit: '8kb', deleteAfterEncoding: true}))   //- 被编码后是否删除图像
   	.pipe(gulp.dest('./'+y_Dz+'/'));
}

/*------------------------------CssBase64----------------------------------*/

function cssBase64(){										
	return gulp.src(['./'+y_Dz+'/static/css/*.css'])										
	.pipe(css64({
	extensions: ['jpg','png','gif','webp'],
	maxImageSize: 2*1024,// bytes
	deleteAfterEncoding: true
	}))
	.pipe(concat('index.css'))					
	.pipe(gulp.dest('./'+y_Dz+'/static/css/'));				
}

gulp.task('baseAll', gulp.series(cssBase64, htmlBase64));

/*-------------------------------------Rev-----------------------------------*/	

function revDelfile(){
	return del('./'+y_Rz+'/');
}

function revDeljson() {
	return del('./'+y_Rn+'/');	
}

function revHtml(){
	return gulp.src(['./'+y_Rn+'/**/*.json', './'+y_Dz+'/*.html'])
	.pipe(revCollector())
	.pipe(gulp.dest('./'+y_Rz+'/'));
}

function revStyle(){
	return gulp.src(['./'+y_Rn+'/**/*.json', './'+y_Rz+'/static/css/*.css'])
	.pipe(revCollector())
	.pipe(gulp.dest('./'+y_Rz+'/static/css/'));
}

function revCss(){										
	return gulp.src(['./'+y_Dz+'/static/css/*.css'])										
	.pipe(rev())
	.pipe(gulp.dest('./'+y_Rz+'/static/css/'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('./'+y_Rn+'/static/css/'));	
}

function revJs(){										
	return gulp.src(['./'+y_Dz+'/static/js/*.js'])										
	.pipe(rev())
	.pipe(gulp.dest('./'+y_Rz+'/static/js/'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('./'+y_Rn+'/static/js/'));
}

function revFont(){										
	return gulp.src(['./'+y_Dz+'/static/font/*.*'])										
	.pipe(rev())
	.pipe(gulp.dest('./'+y_Rz+'/static/font/'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('./'+y_Rn+'/static/font/'));
}

function revImg(){										
	return gulp.src(['./'+y_Dz+'/static/img/**/*.*'])										
	.pipe(rev())
	.pipe(gulp.dest('./'+y_Rz+'/static/img/'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('./'+y_Rn+'/static/img/'));			
}

gulp.task('revAll', gulp.series(revDelfile, revDeljson, gulp.parallel(revImg, revFont, revJs, revCss), revStyle, revHtml));

/*------------------------------Htmlmin----------------------------------*/	

function HtmlMin(){										
	var options = {
	removeComments: true,                                    //- 清除HTML注释
	collapseWhitespace: true,                                //- 压缩HTML
	minifyJS: true,                                          //- 压缩页面JS
	minifyCSS: true                                          //- 压缩页面CSS
	};
	return gulp.src('./'+y_Rz+'/*.html')
	.pipe(htmlmin(options))
	.pipe(gulp.dest('./'+y_Rz+'/'));					
}

function HtmlUrl(){					
	return gulp.src('./'+y_Rz+'/*.html')
	.pipe(htmlurl({
		prefix: 'https://i-cut.cc/rev/static',
		attrdata: ["img:src", "img:data-src", "img:s-src", "img:data-srcset", "script:src", "link:href"]
	}))
	.pipe(gulp.dest('./'+y_Rz+'/'));
}

gulp.task('htmlAll', gulp.series(HtmlUrl, HtmlMin));

/*------------------------------browserSync----------------------------------*/

function browser(){
	return browserSync.init({
		files: "**",                                               //- 监控所有文件
		server: {baseDir: './'+y_Dz+'/', index: "index.html"},     //- 引索
		open : false	
	});
}

gulp.task(browser);

gulp.task('default', gulp.series('distDelFile', 'cssSprite', 'svgSprite', 'cssAll', 'imgAll', 'htmlDeal', 'fontAll', 'webpAll', 'baseAll'));