import * as THREE from "./three.module.js"
import {GLTFLoader} from "./GLTFLoader.js"
import { OrbitControls } from "./OrbitControls.js";

let canvas, ID_home
let scene, camera, renderer, controls;
let modul_tayquay,giac_hut,xilanh_day,Phoi_cao_Mau_do_day, Phoi_cao_Mau_do_quay,Tram_cap_phoi_thieu
let done_load_3D = false;
let speed_quay = 8;
let speed_capPhoi = 5;
let diChuyenCaHe = 0.4;
const element = document.getElementById("_3dTram1_HW");
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
    camera.position.x = 1.1;
    camera.position.y = 1.3;
    camera.position.z = 1.0;
    scene.add(camera)
    
    controls = new OrbitControls(camera,canvas);
    controls.addEventListener('change', renderer);

    const light5 = new THREE.DirectionalLight(0xffffff, 0.5)
    light5.position.set(0,0,-500)
    scene.add(light5)
    const light6 = new THREE.DirectionalLight(0xffffff, 0.5)
    light6.position.set(0,0,500)
    scene.add(light6)
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5)
    light1.position.set(500,0,0)
    scene.add(light1)

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
        await loader.load('render3D/3D_Tram1/Tram_cap_phoi_thieu.glb', function (glb) {
            // ///////////////////////////////////////////////////////////////////////////////////////
            // ///////////////////////////////////////////////////////////////////////////////////////
            // document.getElementById("hiden-loading").style.display = "none";
            // ///////////////////////////////////////////////////////////////////////////////////////
            // ///////////////////////////////////////////////////////////////////////////////////////
            // tỉ lệ
            Tram_cap_phoi_thieu = glb.scene // gán thuộc tính cảnh của đối tượng cho biến
            Tram_cap_phoi_thieu.scale.set(1, 1, 1);
            // vị trí vật
            Tram_cap_phoi_thieu.position.x = 0+diChuyenCaHe;
            Tram_cap_phoi_thieu.position.y = 0;
            Tram_cap_phoi_thieu.position.z = 0+diChuyenCaHe;
            scene.add(Tram_cap_phoi_thieu); // thêm vào màn hình
            done_load_3D = true;
        }),
        await loader.load('render3D/3D_Tram1/xilanh_day.glb', function (glb) {
            xilanh_day = glb.scene
            // tỉ lệ
            xilanh_day.scale.set(1, 1, 1);
            // vị trí vật
            xilanh_day.position.x = -0.0845+diChuyenCaHe;
            xilanh_day.position.y = 0.699;
            xilanh_day.position.z = 0.116+diChuyenCaHe;
            scene.add(xilanh_day); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_Tram1/modul_tayquay.glb', async function (glb) {
            modul_tayquay = glb.scene;
            // tỉ lệ
            modul_tayquay.scale.set(1, 1, 1);
            // vị trí vật
            modul_tayquay.position.x = -0.05724999999+diChuyenCaHe;
            modul_tayquay.position.y = 0.7689999999999900000;
            modul_tayquay.position.z = -0.0634999999+diChuyenCaHe;
            modul_tayquay.rotation.y = -Math.PI / 2;
            changeColorObject(modul_tayquay, 0x8B4513)
            scene.add(modul_tayquay); // thêm vào màn hình

            await loader.load('render3D/3D_Tram1/tay_quay_giac_hut.glb', async function (glb) {
                giac_hut = glb.scene;
                // tỉ lệ
                giac_hut.scale.set(1, 1, 1);
                // vị trí vật
                giac_hut.position.x = 0.1795;
                giac_hut.position.y = 0;
                giac_hut.position.z = -0.030;
                giac_hut.rotation.y = -Math.PI ;
                giac_hut.rotation.x = -Math.PI/2 ;
                changeColorObject(giac_hut, 0x999900)
                modul_tayquay.add(giac_hut); // thêm vào màn hình

                await loader.load('render3D/3D_Tram1/Phoi_cao-Mau_do.glb', function (glb) {
                    Phoi_cao_Mau_do_quay = glb.scene;
                    // Phoi_cao_Mau_do = new THREE.Mesh( glb, new THREE.MeshLambertMaterial( { color: 0xbbbbbb} ));
                    // tỉ lệ
                    Phoi_cao_Mau_do_quay.scale.set(1, 1, 1);
                    // vị trí vật
                    Phoi_cao_Mau_do_quay.position.x = 0;
                    Phoi_cao_Mau_do_quay.position.y = 0.024;
                    Phoi_cao_Mau_do_quay.position.z = 0.037;
                    Phoi_cao_Mau_do_quay.rotation.x = -Math.PI/2 ;
                    changeColorObject(Phoi_cao_Mau_do_quay, 0xFF4500)
                    Phoi_cao_Mau_do_quay.visible = false
                    giac_hut.add(Phoi_cao_Mau_do_quay); // thêm vào màn hình
                })  
            })
        }),
        await loader.load('render3D/3D_Tram1/Phoi_cao-Mau_do.glb', function (glb) {
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
    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper ); // thêm vào màn hình
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
    camera.position.set(1.1, 1.3, 1.0);
    controls.update();  
};
ID_home = '._3dTram1'
canvas = document.querySelector(ID_home)
init();


