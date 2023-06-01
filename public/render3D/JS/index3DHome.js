import * as THREE from "./three.module.js"
import {GLTFLoader} from "./GLTFLoader.js"
import { OrbitControls } from "./OrbitControls.js";


const canvas = document.querySelector('._3dHome')
// các biến renderer 
let scene, camera, renderer, controls;
// các biến load, thực thi lệnh animation sau
let _3_Tram_Dau;
// trạm 1
let modul_Tayquay_T1, giac_Hut_T1, xilanh_Day_T1, phoiT1_Day, phoiT1_Xoay
// trạm 2
let phoi_Len_Xuong_T2, phoi_Truot_Khi_T2, phoi_Truot_Duoi_T2
let xilanh_Day_T2, module_Kiem_Tra_T2, module_Nang_Ha_T2
// trạm 3
let ban_Xoay_T3
let phoiT3_Xoay_1 , phoiT3_Xoay_2 , phoiT3_Xoay_3, phoiT3_Xoay_4, phoiT3_Xoay_5, phoiT3_Xoay_6
let dot_Phoi_T3, giu_Phoi_T3, khoan_T3, gat_Phoi_T3

let done_load_3D = false;
let speed_capPhoi = 10;
let diChuyen_X = 0.1;
let diChuyen_Y = -0.4;
let diChuyen_Z = 0.34;
let xoay = true;
let goc_xoay = 0;
let i = 6;
const element = document.getElementById("_3dHome_HW");
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
    if (element.clientWidth < window.innerHeight) {
        sizes.width = element.clientWidth
        sizes.height = element.clientWidth
    } else if (element.clientWidth >= window.innerHeight) {
        sizes.width = element.clientWidth
        sizes.height = window.innerHeight - 119
    }
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9a9a9a);

    // gần xa camera
    camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.01, 10000)
    //vị trí camera
    camera.position.x = 1;
    camera.position.y = 1.15;
    camera.position.z = -0.3;
    scene.add(camera)

    controls = new OrbitControls(camera, canvas);
    controls.addEventListener('change', renderer);
    // tự động quay

    const light5 = new THREE.DirectionalLight(0xffffff, 0.4)
    light5.position.set(500, 0, 0)
    scene.add(light5)
    const light6 = new THREE.DirectionalLight(0xffffff, 0.5)
    light6.position.set(0, 0, -500)
    scene.add(light6)
    const light2 = new THREE.DirectionalLight(0xffffff, 0.5)
    light2.position.set(0, 0, 500)
    scene.add(light2)
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5)
    light1.position.set(0, 500, 0)
    scene.add(light1)

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    })
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // liên quan đến chi tiết vật
    renderer.shadowMap.enabled = true
    renderer.gammaOutput = true

    let loader = new GLTFLoader();
    await Promise.all([
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ///////////////////////////tram 1/////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        await loader.load('render3D/3D/3 tram dau.glb', function (glb) {
            // tỉ lệ
            _3_Tram_Dau = glb.scene
            _3_Tram_Dau.scale.set(1, 1, 1);
            // vị trí vật
            _3_Tram_Dau.position.x = 0 + diChuyen_X;
            _3_Tram_Dau.position.y = 0 + diChuyen_Y;
            _3_Tram_Dau.position.z = 0 + diChuyen_Z;
            scene.add(_3_Tram_Dau); // thêm vào màn hình
            done_load_3D = true;
        }),
        await loader.load('render3D/3D_Tram1/xilanh_day.glb', function (glb) {
            xilanh_Day_T1 = glb.scene
            // tỉ lệ
            xilanh_Day_T1.scale.set(1, 1, 1);
            // vị trí vật
            xilanh_Day_T1.position.x = -0.0845 + diChuyen_X;
            xilanh_Day_T1.position.y = 0.699 + diChuyen_Y;
            xilanh_Day_T1.position.z = 0.116 + diChuyen_Z;
            scene.add(xilanh_Day_T1); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_Tram1/modul_tayquay.glb', async function (glb) {
            modul_Tayquay_T1 = glb.scene;
            // tỉ lệ
            modul_Tayquay_T1.scale.set(1, 1, 1);
            // vị trí vật
            modul_Tayquay_T1.position.x = -0.057250 + diChuyen_X;
            modul_Tayquay_T1.position.y = 0.768999 + diChuyen_Y;
            modul_Tayquay_T1.position.z = -0.06350 + diChuyen_Z;
            modul_Tayquay_T1.rotation.y = -Math.PI / 2;
            changeColorObject(modul_Tayquay_T1, 0x8B4513)
            scene.add(modul_Tayquay_T1); // thêm vào màn hình

            await loader.load('render3D/3D_Tram1/tay_quay_giac_hut.glb', async function (glb) {
                giac_Hut_T1 = glb.scene;
                // tỉ lệ
                giac_Hut_T1.scale.set(1, 1, 1);
                // vị trí vật
                giac_Hut_T1.position.x = 0.1795;
                giac_Hut_T1.position.y = 0;
                giac_Hut_T1.position.z = -0.030;
                giac_Hut_T1.rotation.y = -Math.PI ;
                giac_Hut_T1.rotation.x = -Math.PI/2 ;
                changeColorObject(giac_Hut_T1, 0x999900)
                modul_Tayquay_T1.add(giac_Hut_T1); // thêm vào màn hình

                await loader.load('render3D/3D_Tram1/Phoi_cao-Mau_do.glb', function (glb) {
                    phoiT1_Xoay = glb.scene;
            
                    // tỉ lệ
                    phoiT1_Xoay.scale.set(1, 1, 1);
                    // vị trí vật
                    phoiT1_Xoay.position.x = 0;
                    phoiT1_Xoay.position.y = 0.024;
                    phoiT1_Xoay.position.z = 0.037;
                    phoiT1_Xoay.rotation.x = -Math.PI/2 ;
                    changeColorObject(phoiT1_Xoay, 0xFF4500)
                    phoiT1_Xoay.visible = false
                    giac_Hut_T1.add(phoiT1_Xoay); // thêm vào màn hình
                })  
            })
        }),
        await loader.load('render3D/3D_Tram1/Phoi_cao-Mau_do.glb', function (glb) {
            phoiT1_Day = glb.scene;
    
            // tỉ lệ
            phoiT1_Day.scale.set(1, 1, 1);
            // vị trí vật
            phoiT1_Day.position.x = -0.08 + diChuyen_X;
            phoiT1_Day.position.y = 0.7325 + diChuyen_Y;
            phoiT1_Day.position.z = 0.116 + diChuyen_Z;
            changeColorObject(phoiT1_Day, 0xFF4500)
            scene.add(phoiT1_Day); // thêm vào màn hình
        }),
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ///////////////////////////tram 2/////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        await loader.load('render3D/3D_Tram2/Module_kiem_tra.glb', function (glb) {
            module_Kiem_Tra_T2 = glb.scene
            // tỉ lệ
            module_Kiem_Tra_T2.scale.set(1, 1, 1);
            // vị trí vật
            module_Kiem_Tra_T2.position.x = -0.02528992 + diChuyen_X;
            module_Kiem_Tra_T2.position.y = 1.1484098 + diChuyen_Y;
            module_Kiem_Tra_T2.position.z = -0.230519 + diChuyen_Z;
            module_Kiem_Tra_T2.rotation.x = Math.PI;
            module_Kiem_Tra_T2.rotation.y = Math.PI/2;
            scene.add(module_Kiem_Tra_T2); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_Tram2/Module_nang_ha.glb', async function (glb) {
            module_Nang_Ha_T2 = glb.scene;
            // tỉ lệ
            module_Nang_Ha_T2.scale.set(1, 1, 1);
            // vị trí vật
            module_Nang_Ha_T2.position.x = 0.051 + diChuyen_X;
            module_Nang_Ha_T2.position.y = 0.7271585 + diChuyen_Y;
            module_Nang_Ha_T2.position.z = -0.1825 + diChuyen_Z;
            module_Nang_Ha_T2.rotation.y = Math.PI / 2;
            // changeColorObject(phoiT1_Day, 0xFF4500)
            scene.add(module_Nang_Ha_T2); // thêm vào màn hình
            ////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////
            await loader.load('render3D/3D_Tram2/Can_gat_phoi.glb', function (glb) {
                xilanh_Day_T2 = glb.scene;
                // tỉ lệ
                xilanh_Day_T2.scale.set(1, 1, 1);
                // vị trí vật
                xilanh_Day_T2.position.x = 0.0166585;
                xilanh_Day_T2.position.y = 0 ;
                xilanh_Day_T2.position.z = -0.054 ;
                xilanh_Day_T2.rotation.z = -Math.PI / 2;
                xilanh_Day_T2.rotation.x = Math.PI / 2;
                // changeColorObject(xilanh_Day_T2, 0xFF4500)
                module_Nang_Ha_T2.add(xilanh_Day_T2); // thêm vào màn hình
            });
            ////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////
            await loader.load('render3D/3D_Tram2/Phoi_cao-Mau_do.glb', function (glb) {
                phoi_Len_Xuong_T2 = glb.scene;
        
                // tỉ lệ
                phoi_Len_Xuong_T2.scale.set(1, 1, 1);
                // vị trí vật
                phoi_Len_Xuong_T2.position.x = 0.0505;
                phoi_Len_Xuong_T2.position.y = 0;
                phoi_Len_Xuong_T2.position.z = -0.054;
                changeColorObject(phoi_Len_Xuong_T2, 0xFF4500)
                phoi_Len_Xuong_T2.visible = false
                module_Nang_Ha_T2.add(phoi_Len_Xuong_T2); // thêm vào màn hình
            });   
            ////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////
        }),
        await loader.load('render3D/3D_Tram2/Phoi_cao-Mau_do.glb', function (glb) {
            phoi_Truot_Khi_T2 = glb.scene;
    
            // tỉ lệ
            phoi_Truot_Khi_T2.scale.set(1, 1, 1);
            // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
            phoi_Truot_Khi_T2.position.x = -0.0029999 + diChuyen_X;
            phoi_Truot_Khi_T2.position.y = 0.87310115 + diChuyen_Y;
            phoi_Truot_Khi_T2.position.z = -0.2902955 + diChuyen_Z;
            phoi_Truot_Khi_T2.rotation.x = -14.68385579 * (Math.PI / 180); 
            changeColorObject(phoi_Truot_Khi_T2, 0xFF4500)
            phoi_Truot_Khi_T2.visible = false
            scene.add(phoi_Truot_Khi_T2); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_Tram2/Phoi_cao-Mau_do.glb', function (glb) {
                phoi_Truot_Duoi_T2 = glb.scene;
        
                // tỉ lệ
                phoi_Truot_Duoi_T2.scale.set(1, 1, 1);
                // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
                phoi_Truot_Duoi_T2.position.x = -0.0029999 + diChuyen_X;
                phoi_Truot_Duoi_T2.position.y = 0.727 + diChuyen_Y;
                phoi_Truot_Duoi_T2.position.z = -0.2902955 + diChuyen_Z; 
                changeColorObject(phoi_Truot_Duoi_T2, 0xAAFF00) 
                phoi_Truot_Duoi_T2.visible = false
                scene.add(phoi_Truot_Duoi_T2); // thêm vào màn hình
        }),
        ////////////////////////////////////////////////////////////////
        /////////////////////////////Tram 2///////////////////////////////////
        ////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ///////////////////////////tram 3/////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        await loader.load('render3D/3D_tram3/BanXoay.glb', async function (glb) {
            ban_Xoay_T3 = glb.scene;
            // tỉ lệ
            ban_Xoay_T3.scale.set(1, 1, 1);
            // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
            ban_Xoay_T3.position.x = 0.00015255 + diChuyen_X;
            ban_Xoay_T3.position.y = 0.8094634 + diChuyen_Y;
            ban_Xoay_T3.position.z = -0.700811 + diChuyen_Z;
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
            gat_Phoi_T3.position.z = -0.837245304386 + diChuyen_Z;
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
            dot_Phoi_T3.position.z = -0.624402416 + diChuyen_Z;
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
            giu_Phoi_T3.position.z = -0.844161638 + diChuyen_Z;
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
            khoan_T3.position.z = -0.77012175836 + diChuyen_Z;
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
    // lưu ý: three.js bao gồm shim requestAnimationFrame
     // thay thế cho việc sử dụng setInterval để cập nhật bản vẽ trong trình duyệt
     // điều này thực sự yêu cầu hàm animate được gọi lại cho lần vẽ tiếp theo
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    if (done_load_3D == true) {
        /////////////////////// trạm 1////////////////////////////////////////
        // quay nhả phôi
        let gioi_han_xy_lanh_quay_nha_phoi = 175*(Math.PI/180)
        if ( _3PV1 == true && _3PV2 == false) {
            if ( modul_Tayquay_T1.rotation.z < gioi_han_xy_lanh_quay_nha_phoi)
            {
                modul_Tayquay_T1.rotation.z = (modul_Tayquay_T1.rotation.z+(Math.PI/180)*1.3* speed_capPhoi)%(2*Math.PI);
                giac_Hut_T1.rotation.y = (giac_Hut_T1.rotation.y+(Math.PI/180)*1.3* speed_capPhoi)%(2*Math.PI);
                // phoiT1_Xoay.visible = true
            }
        }
        // quay hút phôi
        let gioi_han_xy_lanh_quay_hut_phoi = 5*(Math.PI/180)
        if ( _3PV1 == false && _3PV2 == true) {
            if ( modul_Tayquay_T1.rotation.z > gioi_han_xy_lanh_quay_hut_phoi)
                {
                    modul_Tayquay_T1.rotation.z = (modul_Tayquay_T1.rotation.z-(Math.PI/180)*1.3* speed_capPhoi)%(2*Math.PI);
                    giac_Hut_T1.rotation.y = (giac_Hut_T1.rotation.y-(Math.PI/180)*1.3* speed_capPhoi)%(2*Math.PI);
                    // phoiT1_Xoay.visible = false
                }
        }
        // thu phôi vào
        let gioi_han_xy_lanh_thu = -0.0800 + diChuyen_X;
        if (  _3PV4 == false && _3PV5 == true ) {
            if ( xilanh_Day_T1.position.x > gioi_han_xy_lanh_thu)
            {
                xilanh_Day_T1.position.x = xilanh_Day_T1.position.x - 0.003* speed_capPhoi;
                phoiT1_Day.position.x = phoiT1_Day.position.x - 0.003* speed_capPhoi; 
                phoiT1_Day.visible = false; 
            }
        }
        // đẩy phôi ra
        let gioi_han_xy_lanh_day = -0.0075 + diChuyen_X;
        if ( _3PV4 == true && _3PV5 == false ) {
            if ( xilanh_Day_T1.position.x < gioi_han_xy_lanh_day)
            {
                xilanh_Day_T1.position.x = xilanh_Day_T1.position.x + 0.002* speed_capPhoi;
                phoiT1_Day.position.x = phoiT1_Day.position.x + 0.002* speed_capPhoi; 
                phoiT1_Day.visible = true; 
            }
        }
        // hút phôi
        if ( _3PV3 == true) {
            phoiT1_Xoay.visible = true; 
        }
        else if ( _3PV3 == false) {
            phoiT1_Xoay.visible = false; 
        }
        ////////////////////////////////////////////////////////    
        ////////////////////////////////////////////////////////    
        ////////////////////////////////////////////////////////    
    
    
        /////////////////////// trạm 2////////////////////////////////////////
        if (_2_2B2 == true) {
            changeColorObject(phoi_Len_Xuong_T2, 0xFF4500);    // đỏ
        } else if (_2_2B2 == false ) {
            changeColorObject(phoi_Len_Xuong_T2, 0xAAFF00);    //đen
        }
        // dat o dau cho những cái sau ghi đè
        // hiên khi cb có phôi, báo yC ko có phôi
        // && (Phoi_truot_khi_2.visible == false)
        // thêm khi xy lanh quay sang nhả phôi == true chắc là oke
        // hoặc tín hiệu hút phôi có hay không là oke
        // tạm thời dùng tín hiệu đi xuống _2_3PV2 đang bằng false để làm xuất hiện phôi
    
        // đang mắc ở đây
        ////////////////////////////////////////////////////////////////////////////////
        if ((_2_2B1 == true) && (_2_3B1 == false)) {
            phoi_Len_Xuong_T2.visible = true;
        }
        ////////////////////////////////////////////////////////////////////////////////
    
        // xy lanh nâng hạ phôi
        let gioi_han_xy_lanh_len = 0.95 + diChuyen_Y
        // lên hết
        if ((_2_3PV1 == true) && (_2_3PV2 == false)) {
            if (module_Nang_Ha_T2.position.y < gioi_han_xy_lanh_len) {
                // xy lanh lên
                module_Nang_Ha_T2.position.y = module_Nang_Ha_T2.position.y + 0.0005* speed_capPhoi;
                if ( module_Nang_Ha_T2.position.y > (gioi_han_xy_lanh_len - 0.03)){
                    // kiểm tra chiều cao phôi lến
                    module_Kiem_Tra_T2.position.y = module_Kiem_Tra_T2.position.y + 0.0005* speed_capPhoi;
                }
            }  
        }
        // xuống giữa
        let gioi_han_xy_lanh_giua = 0.888158 + diChuyen_Y
        if ((_2_3PV1 == false) && (_2_3PV2 == true) && (_2_2B2 == true)) {
            if (module_Nang_Ha_T2.position.y > gioi_han_xy_lanh_giua) {
                module_Nang_Ha_T2.position.y = module_Nang_Ha_T2.position.y - 0.001* speed_capPhoi;
                if (module_Kiem_Tra_T2.position.y > (1.1484 + diChuyen_Y)) {
                    // kiểm tra chiều cao phôi xuống
                    module_Kiem_Tra_T2.position.y = module_Kiem_Tra_T2.position.y - 0.001* speed_capPhoi;
                }
            }
        }
        // xy lanh nâng hạ đi xuống hết
        let gioi_han_xy_lanh_duoi = 0.732158 + diChuyen_Y
        if ((_2_3PV1 == false) && (_2_3PV2 == true) && (_2_2B2 == false)){
            if (module_Nang_Ha_T2.position.y > gioi_han_xy_lanh_duoi) {
                module_Nang_Ha_T2.position.y = module_Nang_Ha_T2.position.y - 0.001* speed_capPhoi;
                if (module_Kiem_Tra_T2.position.y > (1.1484 + diChuyen_Y)) {
                    // kiểm tra chiều cao phôi xuống
                    module_Kiem_Tra_T2.position.y = module_Kiem_Tra_T2.position.y - 0.001* speed_capPhoi;
                }
            }
        }
    
        // đấy phôi trạm 2
        let gioi_han2_day_phoi_ra = 0.075 
        let gioi_han2_day_phoi_ve = 0.0167 
        // đấy phôi trạm 2 đẩy hết
        if (_2_3PV3 == true){
            if (xilanh_Day_T2.position.x < gioi_han2_day_phoi_ra){
                xilanh_Day_T2.position.x =  xilanh_Day_T2.position.x + 0.002* speed_capPhoi;
                phoi_Len_Xuong_T2.position.x =  phoi_Len_Xuong_T2.position.x + 0.002* speed_capPhoi;
            }
            if (module_Nang_Ha_T2.position.y > (gioi_han_xy_lanh_giua - 0.05)) {
                changeColorObject(phoi_Len_Xuong_T2, 0xFF4500) //đỏ 
            }
        } else if (_2_3PV3 == false) {
            // đấy phôi trạm 2 thu về hết
            if (xilanh_Day_T2.position.x > gioi_han2_day_phoi_ve)
            {
                xilanh_Day_T2.position.x =  xilanh_Day_T2.position.x - 0.002* speed_capPhoi;
                //ẩn phôi đỏ lên xuống
                phoi_Len_Xuong_T2.visible = false
                // phôi lên xuống về vị trí ban đầu
                phoi_Len_Xuong_T2.position.x = 0.0505;
                // đẩy phôi ở giữa
                if (module_Nang_Ha_T2.position.y > (gioi_han_xy_lanh_giua - 0.05)) {
                    // hiện phôi trượt khí
                    phoi_Truot_Khi_T2.visible = true
                }
                // đẩy phôi ở dưới
                if (module_Nang_Ha_T2.position.y < (gioi_han_xy_lanh_duoi + 0.01)) {
                    phoi_Truot_Duoi_T2.position.z = -0.2902955 + diChuyen_Z; 
                    // hiện phôi trượt dưới
                    phoi_Truot_Duoi_T2.visible = true
                }
            }
        }
        // trượt phôi ở máng chứa phôi bên dưới
        let gioi_han_Phoi_truot_duoi = -0.468 + diChuyen_Z
        if ((phoi_Truot_Duoi_T2.visible == true) && (phoi_Truot_Duoi_T2.position.z > gioi_han_Phoi_truot_duoi)) {
            phoi_Truot_Duoi_T2.position.z = phoi_Truot_Duoi_T2.position.z - 0.002* speed_capPhoi;
        }
        // console.log(Phoi_truot_duoi.position.z) > -0.422295 gioi_han_Phoi_truot_duoi?
    
        // bật máng trượt khí, trượt phôi ở máng trượt khí
        let gioi_han_phoi_truot_khi = -0.512295 + diChuyen_Z
        if ( _2_3PV4 == true ){
            if ((phoi_Truot_Khi_T2.position.z > gioi_han_phoi_truot_khi) && (phoi_Len_Xuong_T2.visible == false) && (phoi_Truot_Khi_T2.visible == true)) {
                phoi_Truot_Khi_T2.position.z =  phoi_Truot_Khi_T2.position.z - 0.0015* speed_capPhoi;
                phoi_Truot_Khi_T2.position.y =  phoi_Truot_Khi_T2.position.y - 0.000375* speed_capPhoi;
                // thêm điều kiện phôi trượt khí false là oki
                // if (phoi_Truot_Khi_T2.position.z < gioi_han_phoi_truot_khi) {
                //     // phoi_Truot_Khi_T2.visible = false;
                // }
            }
        } else if (_2_3PV4 == false && phoi_Truot_Khi_T2.visible == false) {
            phoi_Truot_Khi_T2.position.y = 0.87310115 + diChuyen_Y;
            phoi_Truot_Khi_T2.position.z = -0.2902955 + diChuyen_Z;
        }
    
    
    
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
        if ( _3_2B1 == true && _3_2B2 == false) {
        // nếu phôi xuất hiện ở trạm 3 thì phôi máng trượt trạm 2 mất đi
        // Phoi_cao_Mau_do_xoay_6.visible == true
        // chọn 1 trong 2 cái sau về false cũng oki
            phoi_Truot_Khi_T2.visible = false;
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
    ////////////////////////////////////////////////////////////////
    }
}
document.getElementById("ban_dau").onclick = function() {
    // ban đầu
    camera.position.set(1, 1.3, -0.3);
    controls.update();  
};
 // phải viết các hàm đọc sự kiện đứng trước {init (hàm lặp vô tận)}
$(document).ready(function() {
    init();
});