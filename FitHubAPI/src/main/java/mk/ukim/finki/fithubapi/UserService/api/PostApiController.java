package mk.ukim.finki.fithubapi.UserService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.fithubapi.UserService.dto.PostDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertCommentDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertPostDto;
import mk.ukim.finki.fithubapi.UserService.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
public class PostApiController {

    private final PostService postService;

    @GetMapping("/postById/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable @NotNull Long postId) {
        return ResponseEntity.ok(postService.gePostById(postId));
    }

    @PostMapping("/add")
    public ResponseEntity<PostDto> addPost(@NotNull @RequestBody UpsertPostDto upsertPostDto) {
        return ResponseEntity.ok(postService.addPost(upsertPostDto));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<PostDto> editPost(
            @PathVariable Long id,
            @NotNull @RequestBody UpsertPostDto upsertPostDto) {
        return ResponseEntity.ok(postService.editPost(id, upsertPostDto));
    }

    @PutMapping("/likePost")
    public ResponseEntity<PostDto> likePost(
            @NotNull @RequestParam Long postId,
            @NotNull @RequestParam Long userId) {
        return ResponseEntity.ok(postService.likePost(postId, userId));
    }

    @PutMapping("/unlikePost")
    public ResponseEntity<PostDto> unlikePost(
            @NotNull @RequestParam Long postId,
            @NotNull @RequestParam Long userId) {
        return ResponseEntity.ok(postService.unlikePost(postId, userId));
    }

    @PutMapping("/addComment/{postId}")
    public ResponseEntity<PostDto> addCommentToPost(
            @NotNull @PathVariable Long postId,
            @NotNull @RequestBody UpsertCommentDto upsertCommentDto) {
        return ResponseEntity.ok(postService.addCommentToPost(postId, upsertCommentDto));
    }

    @PutMapping("/removeComment/{commentId}")
    public ResponseEntity<PostDto> removeComment(
            @NotNull @PathVariable Long commentId) {
        return ResponseEntity.ok(postService.removeComment(commentId));
    }

    @GetMapping("/getForUsersFeed/{userId}")
    public ResponseEntity<List<PostDto>> getAllPostForUsersFeed(@PathVariable @NotNull Long userId,
                                                                @RequestParam(defaultValue = "0") Integer page,
                                                                @RequestParam(defaultValue = "10") Integer size) {
        return ResponseEntity.ok(postService.getAllPostsForUsersFeed(userId, page, size));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<PostDto>> getAllPostForUser(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok(postService.getAllPostsForUser(userId));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Long> deletePost(@PathVariable @NotNull Long postId) {
        return ResponseEntity.ok(postService.deletePost(postId));
    }
}
