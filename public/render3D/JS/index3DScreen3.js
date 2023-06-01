import * as THREE from "./three.module.js"
import {GLTFLoader} from "./GLTFLoader.js"
import { OrbitControls } from "./OrbitControls.js";
// trạm 3
let Tram_banxoay;
let ban_Xoay_T3
let phoiT3_Xoay_1 , phoiT3_Xoay_2 , phoiT3_Xoay_3, phoiT3_Xoay_4, phoiT3_Xoay_5, phoiT3_Xoay_6
let dot_Phoi_T3, giu_Phoi_T3, khoan_T3, gat_Phoi_T3

let done_load_3D = false;
let speed_capPhoi = 10;
let diChuyen_X = 0.4;
let diChuyen_Y = 0;
let diChuyen_Z = 0.3;
let xoay = true;
let goc_xoay = 0;
let i = 6;

let canvas, ID_home
let scene, camera, renderer, controls;
const element = document.getElementById("_3dTram3_HW");

var materialBase = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, shininess: 200 });
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

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9a9a9a);

    // gần xa camera
    camera = new THREE.PerspectiveCamera(60, sizes.width/sizes.height, 0.1, 10)
    //vị trí camera
    camera.position.x = 0.9;
    camera.position.y = 1.39;
    camera.position.z = 0.7;
    scene.add(camera)
    
    controls = new OrbitControls(camera,canvas);
    controls.addEventListener('change', renderer);

    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 1;
    // controls.screenSpacePanning = true;
    const light2 = new THREE.DirectionalLight(0xffffff, 0.8)
    light2.position.set(0,500,0)
    scene.add(light2)
    const light5 = new THREE.DirectionalLight(0xffffff, 0.5)
    light5.position.set(0,0,-500)
    scene.add(light5)
    const light6 = new THREE.DirectionalLight(0xffffff, 0.5)
    light6.position.set(0,0,500)
    scene.add(light6)
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5)
    light1.position.set(500,0,0)
    scene.add(light1)

    // renderer = new THREE.WebGLRenderer({antialias:true});
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    }) 
    // renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // liên quan đến chi tiết vật
    renderer.shadowMap.enabled = true
    renderer.gammaOutput = true
    // document.body.appendChild(renderer.domElement);  //renderer = new THREE.WebGLRenderer({antialias:true});

    let loader = new GLTFLoader();
    await Promise.all([
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ///////////////////////////tram 3/////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        await loader.load('render3D/3D_tram3/tramBanXoayThieu.glb', function (glb) {
            // tỉ lệ
            Tram_banxoay = glb.scene
            Tram_banxoay.scale.set(1, 1, 1);
            // vị trí vật
            Tram_banxoay.position.x = 0 + diChuyen_X;
            Tram_banxoay.position.y = 0 + diChuyen_Y;
            Tram_banxoay.position.z = 0 + diChuyen_Z;
            scene.add(Tram_banxoay); // thêm vào màn hình
            done_load_3D = true;
        }),
        await loader.load('render3D/3D_tram3/BanXoay.glb', async function (glb) {
            ban_Xoay_T3 = glb.scene;
            // tỉ lệ
            ban_Xoay_T3.scale.set(1, 1, 1);
            // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
            ban_Xoay_T3.position.x = 0.00015255 + diChuyen_X;
            ban_Xoay_T3.position.y = 0.8094634 + diChuyen_Y;
            ban_Xoay_T3.position.z = -0.700811 + diChuyen_Z + 0.7;
            ban_Xoay_T3.rotation.y = Math.PI / 2; 
            changeColorObject(ban_Xoay_T3, 0xcfe2f3)
            scene.add(ban_Xoay_T3); // thêm vào màn hình
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            await loader.load('render3D/3D_tram3/Phoi_cao-Mau_do.glb', function (glb) {
                phoiT3_Xoay_1 = glb.scene;
                // tỉ lệ
                phoiT3_Xoay_1.scale.set(1, 1, 1);
                // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
                phoiT3_Xoay_1.position.x = -0.07675;
                phoiT3_Xoay_1.position.y = 0;
                phoiT3_Xoay_1.position.z = 0.1329349;
                // phoiT3_Xoay_1.rotation.x = -(180-165.31614421) * (Math.PI / 180); 
                changeColorObject(phoiT3_Xoay_1, 0xFF4500)
                phoiT3_Xoay_1.visible = false
                ban_Xoay_T3.add(phoiT3_Xoay_1); // thêm vào màn hình
            });  
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////    
            await loader.load('render3D/3D_tram3/Phoi_cao-Mau_do.glb', function (glb) {
                phoiT3_Xoay_2 = glb.scene;
                // tỉ lệ
                phoiT3_Xoay_2.scale.set(1, 1, 1);
                // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
                phoiT3_Xoay_2.position.x = 0.07675;
                phoiT3_Xoay_2.position.y = 0 ;
                phoiT3_Xoay_2.position.z = 0.132934899;
                changeColorObject(phoiT3_Xoay_2, 0xFF4500)
                phoiT3_Xoay_2.visible = false
                ban_Xoay_T3.add(phoiT3_Xoay_2); // thêm vào màn hình
            });  
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            await loader.load('render3D/3D_tram3/Phoi_cao-Mau_do.glb', function (glb) {
                phoiT3_Xoay_3 = glb.scene;
                // tỉ lệ
                phoiT3_Xoay_3.scale.set(1, 1, 1);
                // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
                phoiT3_Xoay_3.position.x = 0.1535;
                phoiT3_Xoay_3.position.y = 0;
                phoiT3_Xoay_3.position.z = 0;
                changeColorObject(phoiT3_Xoay_3, 0xFF4500)
                phoiT3_Xoay_3.visible = false
                ban_Xoay_T3.add(phoiT3_Xoay_3); // thêm vào màn hình
            }); 
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            await loader.load('render3D/3D_tram3/Phoi_cao-Mau_do.glb', function (glb) {
                phoiT3_Xoay_4 = glb.scene;
                // tỉ lệ
                phoiT3_Xoay_4.scale.set(1, 1, 1);
                // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
                phoiT3_Xoay_4.position.x = 0.07675;
                phoiT3_Xoay_4.position.y = 0 ;
                phoiT3_Xoay_4.position.z = -0.132935 ;
                changeColorObject(phoiT3_Xoay_4, 0xFF4500)
                phoiT3_Xoay_4.visible = false
                ban_Xoay_T3.add(phoiT3_Xoay_4); // thêm vào màn hình
            }); 
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            await loader.load('render3D/3D_tram3/Phoi_cao-Mau_do.glb', function (glb) {
                phoiT3_Xoay_5 = glb.scene;
                // tỉ lệ
                phoiT3_Xoay_5.scale.set(1, 1, 1);
                // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
                phoiT3_Xoay_5.position.x = -0.07675;
                phoiT3_Xoay_5.position.y = 0;
                phoiT3_Xoay_5.position.z = -0.132935;
                changeColorObject(phoiT3_Xoay_5, 0xFF4500)
                phoiT3_Xoay_5.visible = false
                ban_Xoay_T3.add(phoiT3_Xoay_5); // thêm vào màn hình
            });
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            await loader.load('render3D/3D_tram3/Phoi_cao-Mau_do.glb', function (glb) {
                phoiT3_Xoay_6 = glb.scene;
                // tỉ lệ
                phoiT3_Xoay_6.scale.set(1, 1, 1);
                // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
                phoiT3_Xoay_6.position.x = -0.1535;
                phoiT3_Xoay_6.position.y = 0;
                phoiT3_Xoay_6.position.z = 0;
                changeColorObject(phoiT3_Xoay_6, 0xFF4500)
                phoiT3_Xoay_6.visible = false
                ban_Xoay_T3.add(phoiT3_Xoay_6); // thêm vào màn hình
            });
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
        }),
        await loader.load('render3D/3D_tram3/gatPhoi.glb', function (glb) {
            gat_Phoi_T3 = glb.scene;
            // tỉ lệ
            gat_Phoi_T3.scale.set(1, 1, 1);
            gat_Phoi_T3.position.x = 0.0728704 + diChuyen_X; 
            gat_Phoi_T3.position.y = 0.845 + diChuyen_Y;
            gat_Phoi_T3.position.z = -0.837245304386 + diChuyen_Z + 0.7;
            gat_Phoi_T3.rotation.y = 122.01715249 * (Math.PI / 180);
            changeColorObject(gat_Phoi_T3, 0xFF4500)
            // Phoi_cao_Mau_do.visible = false
            scene.add(gat_Phoi_T3); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_tram3/dot_phoi.glb', function (glb) {
            dot_Phoi_T3 = glb.scene;
            // tỉ lệ
            dot_Phoi_T3.scale.set(1, 1, 1);
            dot_Phoi_T3.position.x = -0.132979 + diChuyen_X;
            dot_Phoi_T3.position.y = 0.9395 + diChuyen_Y;
            dot_Phoi_T3.position.z = -0.624402416 + diChuyen_Z + 0.7;
            changeColorObject(dot_Phoi_T3, 0x888888)
            // Phoi_cao_Mau_do.visible = false
            scene.add(dot_Phoi_T3); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_tram3/giu_phoi.glb', function (glb) {
            giu_Phoi_T3 = glb.scene;
            // tỉ lệ
            giu_Phoi_T3.scale.set(1, 1, 1);
            giu_Phoi_T3.position.x = -0.243670068 + diChuyen_X;
            giu_Phoi_T3.position.y = 0.819 + diChuyen_Y;
            giu_Phoi_T3.position.z = -0.844161638 + diChuyen_Z + 0.7;
            giu_Phoi_T3.rotation.z = Math.PI / 2
            giu_Phoi_T3.rotation.y = -30.55841921 * (Math.PI / 180);
            changeColorObject(giu_Phoi_T3, 0xA9A9A9)
            scene.add(giu_Phoi_T3); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_tram3/khoan.glb', function (glb) {
            khoan_T3 = glb.scene;
            // tỉ lệ
            khoan_T3.scale.set(1, 1, 1);
            khoan_T3.position.x = -0.1458953 + diChuyen_X;
            khoan_T3.position.y = 0.969645144 + diChuyen_Y;
            khoan_T3.position.z = -0.77012175836 + diChuyen_Z + 0.7;
            khoan_T3.rotation.z = -Math.PI / 2;
            khoan_T3.rotation.y = 29.52994997 * (Math.PI / 180);
            changeColorObject(khoan_T3, 0x7393B3)
            scene.add(khoan_T3); // thêm vào màn hình
        }),
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ///////////////////////////tram 3/////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
    ])
    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper ); // thêm vào màn hình
    animate();
}
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    if (done_load_3D == true) {
        // ////////////////////////////////////////////////////////    
            // ////////////////////////////////////////////////////////    
            // //////////////////////////////////////////////////////// 
            // nếu phôi xuất hiện ở trạm 3 thì phôi máng trượt trạm 2 mất đi
            // Phoi_cao_Mau_do_xoay_6.visible == true
            // chọn 1 trong 2 cái sau về false cũng oki
            // if (_3_2B1 == true && _3_2B2 == false && _3_2B3 == false) {
            //     phoi_Truot_Khi_T2.visible = false;
            // }
        
            // đột phôi xuống, lên
            let gioi_han_dot_phoi_xuong = 0.9195 + diChuyen_Y
            let gioi_han_dot_phoi_len = 0.9395 + diChuyen_Y 
            if ( _3_3M5 == true) {
                if ( dot_Phoi_T3.position.y > gioi_han_dot_phoi_xuong){
                    // đột xuống
                    dot_Phoi_T3.position.y = dot_Phoi_T3.position.y - 0.001* speed_capPhoi;
                }
            } else if ( _3_3M5 == false) {
                if ( dot_Phoi_T3.position.y < gioi_han_dot_phoi_len){
                    // đột lên
                    dot_Phoi_T3.position.y = dot_Phoi_T3.position.y + 0.001* speed_capPhoi;
                }
            }
            // cho khoan đi xuống
            let gioi_han_khoan_di_xuong = 0.8996451 + diChuyen_Y
            if ( _3_5K4 == true && _3_5K3 == false) {
                if ( khoan_T3.position.y > gioi_han_khoan_di_xuong){
                    // khoan xuống
                    khoan_T3.position.y = khoan_T3.position.y - 0.001* speed_capPhoi;
                }
            }
            // cho khoan đi lên
            let gioi_han_khoan_di_len = 0.9726451 + diChuyen_Y
            if ( _3_5K3 == true &&_3_5K4 == false) {
                if ( khoan_T3.position.y < gioi_han_khoan_di_len){
                    // khoan lên
                    khoan_T3.position.y = khoan_T3.position.y + 0.001* speed_capPhoi;
                }
            }
            // rad
            let gioi_han_gat_phoi_ra = 1.25960105
            let gioi_han_gat_phoi_ve = 2.159601054858497
            if ( _3_3M6 == true) {
                if ( gat_Phoi_T3.rotation.y > gioi_han_gat_phoi_ra){
                    // gạt sang
                    gat_Phoi_T3.rotation.y = gat_Phoi_T3.rotation.y - 0.03* speed_capPhoi;
                    if ( gat_Phoi_T3.rotation.y >  (gioi_han_gat_phoi_ra + 0.3) ){
                        if (phoiT3_Xoay_6.visible == true && (i == 3) ) {
                            phoiT3_Xoay_6.visible = false
                        }
                        if (phoiT3_Xoay_5.visible == true && (i == 2)) {
                            phoiT3_Xoay_5.visible = false
                        }
                        if (phoiT3_Xoay_4.visible == true && (i == 1)) {
                            phoiT3_Xoay_4.visible = false
                        }
                        if (phoiT3_Xoay_3.visible == true && (i == 6)) {
                            phoiT3_Xoay_3.visible = false
                        }
                        if (phoiT3_Xoay_2.visible == true && (i == 5)) {
                            phoiT3_Xoay_2.visible = false
                        }
                        if (phoiT3_Xoay_1.visible == true && (i == 4)) {
                            phoiT3_Xoay_1.visible = false
                        }
                    }
                }
            } else if ( _3_3M6 == false) {
                if ( gat_Phoi_T3.rotation.y < gioi_han_gat_phoi_ve){
                    // gạt về
                    gat_Phoi_T3.rotation.y = gat_Phoi_T3.rotation.y + 0.03* speed_capPhoi;
                }
            }
            ////////////////////////////////////////////////////////////////
            // tạm bỏ && _3_2B2 == false
            // && _3_2B2 == false
            if ( _3_2B1 == true && _3_2B3 == false) {
            // nếu phôi xuất hiện ở trạm 3 thì phôi máng trượt trạm 2 mất đi
            // Phoi_cao_Mau_do_xoay_6.visible == true
            // chọn 1 trong 2 cái sau về false cũng oki
                switch(i) {
                    case 6:
                        phoiT3_Xoay_6.visible = true
                        break;
                    case 5:
                        phoiT3_Xoay_5.visible = true
                        break;
                    case 4:
                        phoiT3_Xoay_4.visible = true
                        break;
                    case 3:
                        phoiT3_Xoay_3.visible = true
                        break;
                    case 2:
                        phoiT3_Xoay_2.visible = true
                        break;
                    case 1:
                        phoiT3_Xoay_1.visible = true
                        break;
                }
            }
            // xoay bàn xoay
            let gioi_han_goc_xoay = 0.3 * (Math.PI / 180)
            if ( _3_4M2 == true) {
                if ( xoay == true) {
                    goc_xoay += 0.0075 * speed_capPhoi;
                    // nếu chưa đạt thì quay tiếp
                    if ( (goc_xoay - 60 * (Math.PI / 180)) < gioi_han_goc_xoay) {
                        ban_Xoay_T3.rotation.y = ban_Xoay_T3.rotation.y - 0.0075 * speed_capPhoi
                    }
                    // đạt thì cộng 1
                    if ( (goc_xoay - 60 * (Math.PI / 180)) > gioi_han_goc_xoay ) {
                        i += 1;
                        if( i > 6) {
                            i=1
                        }
                        goc_xoay = 0
                        xoay = false
                    }
                }
            } else if ( _3_4M2 == false) {
                xoay = true
            }
    }
}
document.getElementById("ban_dau").onclick = function() {
    // ban đầu
    camera.position.set(0.9, 1.39, 0.7);
    controls.update();  
};
ID_home = '._3dTram3'
canvas = document.querySelector(ID_home)
init();