import * as THREE from "./three.module.js"
import {GLTFLoader} from "./GLTFLoader.js"
import { OrbitControls } from "./OrbitControls.js";

let canvas, ID_home
let scene, camera, renderer, controls;
let xy_lanh_doc,tay_kep_phai,xy_lanh_ngang,tay_kep_trai,Tram_tay_gap;
let done_load_3D = false;
let speed_quay = 8;
let speed_capPhoi = 5;
let diChuyenCaHe = 0.4;
const element = document.getElementById("_3dTram4_HW");
// let text = "clientHeight: " + element.clientHeight + "px<br>";
// text += "clientWidth: " + element.clientWidth + "px";
function changeColorObject( Object, colorObject ) {
    Object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            // set the object color
            child.material.color.setHex(colorObject);
        }
    });
}
async function init() {
    // độ rộng khung hình chứa
    var sizes = {
        width: element.clientWidth,
        height: element.clientWidth
    }
    // Scene: Component này sẽ chứa mọi thứ, giống như là 'vũ trụ thu nhỏ' vậy, là nơi mà các 3D object tồn tại
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9a9a9a);

    // gần xa camera
    camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.01, 10000)
    //vị trí camera
    camera.position.x = 0;
    camera.position.y = 0.6;
    camera.position.z = 2;
    scene.add(camera)
    
    controls = new OrbitControls(camera,canvas);
    controls.addEventListener('change', renderer);

    // const light5 = new THREE.DirectionalLight(0xffffff, 1)
    // light5.position.set(500,0,0)
    // scene.add(light5)
    
    // const light6 = new THREE.DirectionalLight(0xffffff, 0.5)
    // light6.position.set(-500,0,0)
    // scene.add(light6)

    // const light1 = new THREE.DirectionalLight(0xffffff, 0.5)
    // light1.position.set(0,0,500)
    // scene.add(light1)

    // const light2 = new THREE.DirectionalLight(0xffffff, 1.5)
    // light2.position.set(0,500,0)
    // scene.add(light2)

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(0, 300, 0);
    scene.add(light1);
    const positionLight1 = new THREE.DirectionalLightHelper(light1);
    scene.add(positionLight1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.9);
    light1.position.set(0, 300, 300);
    scene.add(light2);
    const positionLight2 = new THREE.DirectionalLightHelper(light1);
    scene.add(positionLight2);

    const light3 = new THREE.DirectionalLight(0xffffff, 0.6);
    light1.position.set(200, 600, 700);
    scene.add(light3);
    const positionLight3 = new THREE.DirectionalLightHelper(light1);
    scene.add(positionLight3);
    // Tạo renderer
    // renderer = new THREE.WebGLRenderer({antialias:true});
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    }) 

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // liên quan đến chi tiết vật
    renderer.shadowMap.enabled = true
    renderer.gammaOutput = true

    let loader = new GLTFLoader();

    await Promise.all([
        await loader.load('render3D/3D_tram4/tram_tay_gap.glb', function (glb) {
            // ///////////////////////////////////////////////////////////////////////////////////////
            // ///////////////////////////////////////////////////////////////////////////////////////
            // document.getElementById("hiden-loading").style.display = "none";
            // ///////////////////////////////////////////////////////////////////////////////////////
            // ///////////////////////////////////////////////////////////////////////////////////////
            // tỉ lệ
            Tram_tay_gap = glb.scene // gán thuộc tính cảnh của đối tượng cho biến
            Tram_tay_gap.scale.set(1, 1, 1);
            // vị trí vật
            Tram_tay_gap.position.x = 0;
            Tram_tay_gap.position.y = 0;
            Tram_tay_gap.position.z = 0;
            scene.add(Tram_tay_gap); // thêm vào màn hình
            done_load_3D = true;
        }),
        await loader.load('render3D/3D_tram4/xy_lanh_ngang.glb', function (glb) {
            xy_lanh_ngang = glb.scene
            // tỉ lệ
            xy_lanh_ngang.scale.set(1, 1, 1);
            // vị trí vật
            xy_lanh_ngang.position.x = -0.15;
            xy_lanh_ngang.position.y = 0.55505;
            xy_lanh_ngang.position.z = -0.0388815 ;
            // xy_lanh_ngang.rotation.z = Math.PI ;
            scene.add(xy_lanh_ngang); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_tram4/xy_lanh_doc.glb', async function (glb) {
            xy_lanh_doc = glb.scene
            // tỉ lệ
            xy_lanh_doc.scale.set(1, 1, 1);
            // vị trí vật
            xy_lanh_doc.position.x = -0.14935;
            xy_lanh_doc.position.y = 0.44005;
            xy_lanh_doc.position.z = -0.0083333;
            //xy_lanh_doc.rotation.y = Math.PI;
            // changeColorObject(xy_lanh_doc, 0x8B4513)
            scene.add(xy_lanh_doc); // thêm vào màn hình

            await loader.load('render3D/3D_tram4/tay_kep_phai.glb', async function (glb) {
                tay_kep_phai = glb.scene
                // tỉ lệ
                tay_kep_phai.scale.set(1, 1, 1);
                // vị trí vật
                tay_kep_phai.position.x = -0.1465;
                tay_kep_phai.position.y = 0.31279;
                tay_kep_phai.position.z = 0.0254666;
                //tay_kep_phai.rotation.y = Math.PI;
                // changeColorObject(tay_kep_phai, 0x8B4513)
                scene.add(tay_kep_phai); // thêm vào màn hình
            })
            await loader.load('render3D/3D_tram4/tay_kep_trai.glb', async function (glb) {
                tay_kep_trai = glb.scene
                // tỉ lệ
                tay_kep_trai.scale.set(1, 1, 1);
                // vị trí vật
                tay_kep_trai.position.x = -0.1465;
                tay_kep_trai.position.y = 0.31279;
                tay_kep_trai.position.z = -0.0584333;
                tay_kep_trai.rotation.y = Math.PI;
                // changeColorObject(tay_kep_trai, 0x8B4513)
                scene.add(tay_kep_trai); // thêm vào màn hình
            })
        }),
        await loader.load('render3D/3D_tram4/Phoi_cao-Mau_do.glb', function (glb) {
            Phoi_cao_Mau_do_day = glb.scene;
            // Phoi_cao_Mau_do = new THREE.Mesh( glb, new THREE.MeshLambertMaterial( { color: 0xbbbbbb} ));
            // tỉ lệ
            Phoi_cao_Mau_do_day.scale.set(1, 1, 1);
            // vị trí vật
            Phoi_cao_Mau_do_day.position.x = -0.08+diChuyenCaHe;
            Phoi_cao_Mau_do_day.position.y = 0.7325;
            Phoi_cao_Mau_do_day.position.z = 0.116+diChuyenCaHe;
            changeColorObject(Phoi_cao_Mau_do_day, 0xFF4500)
            scene.add(Phoi_cao_Mau_do_day); // thêm vào màn hình
        })
    ])
    const axesHelper = new THREE.AxesHelper( 1 );
    scene.add( axesHelper ); // thêm vào màn hình
    animate();
}
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    if (done_load_3D == true){
        if ( _3PV1 == true) {
            if ( modul_tayquay.rotation.z < 2*(Math.PI/2))
            {
                modul_tayquay.rotation.z = (modul_tayquay.rotation.z+(Math.PI/180)* speed_quay)%(2*Math.PI);
                giac_hut.rotation.y = (giac_hut.rotation.y+(Math.PI/180)* speed_quay)%(2*Math.PI);
                // Phoi_cao_Mau_do_quay.visible = true
            }
        }
        if ( _3PV2 == true)
        {
            if ( modul_tayquay.rotation.z > 5*(Math.PI/180))
                {
                    modul_tayquay.rotation.z = (modul_tayquay.rotation.z-(Math.PI/180)* speed_quay)%(2*Math.PI);
                    giac_hut.rotation.y = (giac_hut.rotation.y-(Math.PI/180)* speed_quay)%(2*Math.PI);
                    // Phoi_cao_Mau_do_quay.visible = false
                }
        }
        if ( _3PV5 == true )
        {
            if ( xilanh_day.position.x > -0.0845 + diChuyenCaHe)
            {
                // thu phôi vào
                xilanh_day.position.x = xilanh_day.position.x -0.001* speed_capPhoi;
                Phoi_cao_Mau_do_day.position.x = Phoi_cao_Mau_do_day.position.x -0.001* speed_capPhoi; 
                Phoi_cao_Mau_do_day.visible = false; 
            }
        }
        if ( _3PV4 == true) {
            if ( xilanh_day.position.x < -0.0845 + 0.077 + diChuyenCaHe)
            {
                // đẩy phôi ra
                xilanh_day.position.x = xilanh_day.position.x +0.001* speed_capPhoi;
                Phoi_cao_Mau_do_day.position.x = Phoi_cao_Mau_do_day.position.x +0.001* speed_capPhoi; 
                Phoi_cao_Mau_do_day.visible = true; 
            }
        }
        if ( _3PV3 == true) {
            Phoi_cao_Mau_do_quay.visible = true; 
        }
        else if ( _3PV3 == false) {
            Phoi_cao_Mau_do_quay.visible = false; 
        }  
    }
}
// phải viết các hàm đọc sự kiện đứng trước {init (hàm lặp vô tận)}
document.getElementById("ban_dau").onclick = function() {
    // ban đầu
    camera.position.set(0, 0.6, 2);
    controls.update();  
};
ID_home = '._3dTram4'
canvas = document.querySelector(ID_home)
init();


