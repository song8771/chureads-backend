import express from 'express';

// 게시물 관련 모든 API 엔드포인트를 정의하는 라우터
const router = express.Router();

// 모든 게시물 목록을 가져오는 엔드포인트
router.get('/', async (req, res) => {
    try {
        // DB에서 데이터 조회
        

        res.status(200).json({ message: "모든 게시물 목록을 가져왔습니다." });
        console.log("GET 요청 성공");
    } catch (error) {
        console.error("GET 요청 에러:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 특정 게시물 ID로 게시물을 가져오는 엔드포인트
router.get('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        res.status(200).json({ message: `게시물 ID ${postId}를 가져왔습니다.` });
        console.log(`GET 요청 성공: 게시물 ID ${postId}`);
    } catch (error) {
        console.error(`GET 요청 에러: 게시물 ID ${postId}`, error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 게시물을 생성하는 엔드포인트
router.post('/', async (req, res) => {
    const newPost = req.body;
    try {
        res.status(201).json({ message: "게시물이 생성되었습니다.", post: newPost });
        console.log("POST 요청 성공: 게시물 생성", newPost);
    } catch (error) {
        console.error("POST 요청 에러:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 게시물을 업데이트하는 엔드포인트
router.put('/:id', async (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
    try {
        res.status(200).json({ message: `게시물 ID ${postId}가 업데이트되었습니다.`, post: updatedPost });
        console.log(`PUT 요청 성공: 게시물 ID ${postId} 업데이트`, updatedPost);
    } catch (error) {
        console.error(`PUT 요청 에러: 게시물 ID ${postId}`, error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 게시물을 삭제하는 엔드포인트
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        res.status(200).json({ message: `게시물 ID ${postId}가 삭제되었습니다.` });
        console.log(`DELETE 요청 성공: 게시물 ID ${postId}`);
    } catch (error) {
        console.error(`DELETE 요청 에러: 게시물 ID ${postId}`, error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;