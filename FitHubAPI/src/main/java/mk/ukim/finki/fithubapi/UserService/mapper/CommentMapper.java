package mk.ukim.finki.fithubapi.UserService.mapper;

import mk.ukim.finki.fithubapi.UserService.dto.CommentDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertCommentDto;
import mk.ukim.finki.fithubapi.UserService.models.Comment;
import mk.ukim.finki.fithubapi.UserService.models.Post;

import java.util.List;
import java.util.stream.Collectors;

public class CommentMapper {

    public static CommentDto toDto(Comment comment) {
        if (comment == null) {
            return null;
        }

        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setCreationDate(comment.getCreationDate());
        commentDto.setUserId(comment.getUserId());
        commentDto.setPostId(comment.getPost() != null ? comment.getPost().getId() : null);
        commentDto.setComment(comment.getComment());

        return commentDto;
    }

    public static Comment toEntity(UpsertCommentDto upsertCommentDto, Post post) {
        if (upsertCommentDto == null) {
            return null;
        }

        Comment comment = new Comment();
        comment.setUserId(upsertCommentDto.getUserId());
        comment.setComment(upsertCommentDto.getComment());
        comment.setPost(post);

        return comment;
    }

    public static List<CommentDto> toDtoList(List<Comment> comments) {
        if (comments == null) {
            return null;
        }

        return comments.stream()
                .map(CommentMapper::toDto)
                .collect(Collectors.toList());
    }
}
